#bash_sh
SRC=`find . -type f -name "*.xlsx"`
OUT=./output
for file in $SRC ; do 
    mono ./tools/excel2json.exe -e ./$file -j $OUT/prop_$(basename $file .xlsx).json -h 3
done

cp -rf $OUT/* ../minilegend/assets/resources/prop_data/
