
@Echo 1. Flush the target folder specified in the URL
if exist %1 rd /q /s %1

@Echo.
@Echo 2. Run TypeScript Compiler to create the *.d.ts
call tsc --project tsconfig.json --outDir %1

@Echo.
@Echo 3. Run the API-Extractor to generate the public docs
call api-extractor run --local --verbose

@Echo.
@Echo 4. Create the .ts files from the .d.ts because this is what is used by docFx
@REM can't copy this, as the reference to the file would be off with a ".d" instead of the ts
@REM copy index-public.d.ts index-docs.ts
copy index-public-part.d.ts index-public-part.ts

@REM return 0
