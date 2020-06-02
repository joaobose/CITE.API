#!/usr/bin/env bash

cmd="(npm install)"
general_services=("API.service")

for d in "${services[@]}" ; do
    cmd="${cmd} & (cd services/${d} && npm install && npm rebuild)"
done

cmd=${cmd#" & "}
eval "${cmd}"

