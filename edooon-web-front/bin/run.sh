#!/bin/bash
DIR="$( cd "$( dirname "$0"  )" && pwd  )"
echo $DIR
cd $DIR/..
fis3 server start --type jello --no-daemon --port 8081
fis3 release -wL
#sh $Cur_Dir/run.sh
