/**
 * Pull the current branch's configured upstream while preserving local changes.
 * Run from the repository root with `npm run pull` after checking Node.js
 * compatibility. This script does not switch Node.js.
 *
 * Reject unfinished Git operations, stash tracked and untracked changes if any,
 * pull with rebase, then restore only this run's stash, including its index.
 * Keep the stash as a backup and print its commit ID for manual recovery.
 * Ignored files and changes inside submodules are not saved. Other branches,
 * sibling repositories, and submodules are not updated; no build is performed.
 *
 * Any failed command stops execution with a nonzero exit code. A failed pull
 * leaves the stash unapplied; a failed apply may leave partial changes or
 * conflicts. Inspect Git state before recovery rather than rerunning the script.
 */
// These imports load built-in Node.js utilities; no npm packages are needed.
// spawnSync runs an external program and waits for it to finish.
import { spawnSync } from 'node:child_process';
// existsSync checks whether a file or directory exists.
import { existsSync } from 'node:fs';
// resolve combines filesystem paths into an absolute path for the current OS.
import { resolve } from 'node:path';
// fileURLToPath converts a file URL into a normal filesystem path, including on Windows.
import { fileURLToPath } from 'node:url';

// import.meta.url is this script's file URL. '../' points to its parent directory:
// the repository root. This works even when Node is started from another directory.
const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
// let declares a variable we can update later. It starts as undefined, so recovery
// and restoration run only after this execution has recorded a newly created stash.
let savedStash;

// args is an array of Git arguments, for example ['pull', '--rebase'].
// captureOutput defaults to false; pass true when the script needs Git's output.
function git(args, captureOutput = false) {
  // Arguments are passed directly to Git, without shell command-string parsing.
  const result = spawnSync('git', args, {
    // cwd sets Git's working directory; encoding makes captured output a string.
    cwd: repositoryRoot,
    encoding: 'utf8',
    // The ternary expression means: captureOutput ? valueIfTrue : valueIfFalse.
    // When capturing, ignore stdin and collect stdout/stderr in result.
    // Otherwise, inherit the terminal streams so Git can display progress or prompts.
    stdio: captureOutput ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });

  // result.error means Node could not run Git, for example if Git is missing.
  // throw stops the current flow and transfers control to the catch block below.
  if (result.error) throw result.error;
  // A nonzero exit status (or null when terminated by a signal) means Git failed.
  if (result.status !== 0) {
    // Captured errors were not shown in the terminal, so print them before stopping.
    if (captureOutput && result.stderr) process.stderr.write(result.stderr);
    // Backtick strings allow ${...} expressions to be inserted into the message.
    throw new Error(`git ${args.join(' ')} failed (exit ${result.status}).`);
  }

  // trim removes surrounding whitespace, including Git's trailing newline.
  // Commands that do not capture output return an empty string.
  return captureOutput ? result.stdout.trim() : '';
}

// try contains the normal workflow; catch handles any errors thrown along the way.
try {
  // Git creates these marker files/directories while an operation is unfinished.
  // for...of checks each marker before we modify the repository.
  // Resolve Git paths through Git itself so linked worktrees are supported.
  for (const operation of ['rebase-merge', 'rebase-apply', 'MERGE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD']) {
    const operationPath = git(['rev-parse', '--git-path', operation], true);
    const absolutePath = resolve(repositoryRoot, operationPath);
    if (existsSync(absolutePath)) {
      throw new Error('Finish the current Git operation before running npm run pull.');
    }
  }

  // --porcelain gives predictable status output; --untracked-files=all includes new files.
  // An empty string is false in JavaScript, so a clean working tree skips this block.
  if (git(['status', '--porcelain', '--untracked-files=all'], true)) {
    // %H prints the full commit ID; --max-count=1 selects the newest stash.
    // If no stash exists, this command returns an empty string rather than failing.
    const previousStash = git(['stash', 'list', '--max-count=1', '--format=%H'], true);
    // Include new, untracked files in the backup; ignored files remain excluded.
    git(['stash', 'push', '--include-untracked', '-m', '2sxc-ui: local changes before pull']);
    const currentStash = git(['stash', 'list', '--max-count=1', '--format=%H'], true);
    // A successful stash command can be a no-op, for example for submodule-only changes.
    // ! means "not", || means "or", and === checks equality without type conversion.
    if (!currentStash || currentStash === previousStash) {
      throw new Error('No new stash was created. Existing stashes were left untouched. Inspect local changes before pulling.');
    }
    // Use a stable commit ID rather than a stash position that can change.
    savedStash = currentStash;
    console.log(`Saved local changes in stash ${savedStash}. Ignored files are not included.`);
  }

  // Fetch upstream changes and replay local commits on top instead of merging.
  // If Git fails, the helper throws and stash restoration below is skipped.
  git(['pull', '--rebase']);

  // No savedStash means this run did not stash anything; older stashes stay untouched.
  if (savedStash) {
    // Restore the original staging state and retain the backup instead of popping it.
    git(['stash', 'apply', '--index', savedStash]);
    console.log(`Local changes restored. Stash ${savedStash} is kept as a backup.`);
  }

  // console.log writes a normal progress or success message to stdout.
  console.log('Repository pull complete.');
} catch (error) {
  // console.error writes diagnostics to stderr, separately from normal output.
  // Recovery is manual: applying after a failed pull could compound conflicts.
  console.error(error.message);
  if (savedStash) {
    console.error(`Local changes are saved in stash ${savedStash}. Resolve any conflicts before continuing.`);
    console.error(`If the stash has not been applied, restore it with: git stash apply --index ${savedStash}`);
  }
  // Tell npm/the calling terminal the script failed, allowing output to finish.
  // A caller must check this status before starting a release.
  process.exitCode = 1;
}
