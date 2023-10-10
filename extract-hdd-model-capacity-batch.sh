#!/bin/bash

# function to kill all child processes
function kill_child_processes {
    pkill -P $$
}

# trap SIGINT signal and call kill_child_processes function
trap "kill_child_processes" SIGINT

# multprocessing 'python extract-hdd-model-capacity.py'
for i in {2013..2023}
do
    echo "starting $i"
    python extract-hdd-model-capacity.py data/$i output/hdd-model-capacity-$i.csv >> output/hdd-model-capacity-$i.out &
done

# wait for all background jobs to finish
wait

echo "All extracting done"