if exist %1 rd /q /s %1
tsc --project tsconfig.typings.json --outDir %1
return 0
