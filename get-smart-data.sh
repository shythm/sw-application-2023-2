#!/bin/bash

# array for zip file from 2013 to 2023
file_names=("data_Q2_2023.zip" "data_Q1_2023.zip" "data_Q4_2022.zip" "data_Q3_2022.zip" "data_Q2_2022.zip" "data_Q1_2022.zip" "data_Q4_2021.zip" "data_Q3_2021.zip" "data_Q2_2021.zip" "data_Q1_2021.zip" "data_Q4_2020.zip" "data_Q3_2020.zip" "data_Q2_2020.zip" "data_Q1_2020.zip" "data_Q4_2019.zip" "data_Q3_2019.zip" "data_Q2_2019.zip" "data_Q1_2019.zip" "data_Q4_2018.zip" "data_Q3_2018.zip" "data_Q2_2018.zip" "data_Q1_2018.zip" "data_Q4_2017.zip" "data_Q3_2017.zip" "data_Q2_2017.zip" "data_Q1_2017.zip" "data_Q4_2016.zip" "data_Q3_2016.zip" "data_Q2_2016.zip" "data_Q1_2016.zip" "data_2015.zip" "data_2014.zip" "data_2013.zip")

for file_name in ${file_names[@]}
do
    # log file name
    echo "download $file_name ..."

    # download zip file from 'https://f001.backblazeb2.com/file/Backblaze-Hard-Drive-Data/' with file_names silently
    wget -q https://f001.backblazeb2.com/file/Backblaze-Hard-Drive-Data/$file_name -P downloads/

    # log unzip file
    echo "unzip $file_name ..."

    # unzip file
    unzip downloads/$file_name -d data/
done
