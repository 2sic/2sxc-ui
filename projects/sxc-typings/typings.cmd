if exist %1 rd /q /s %1
tsc --project tsconfig.json --outDir %1
return 0
