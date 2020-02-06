#bash_sh
SRC=`find . -type f -name "*.xlsx"`
for file in $SRC ; do 
    mono ./tools/excel2json.exe -e ./$file -j ./output/prop_$(basename $file .xlsx).json -h 3
    
done