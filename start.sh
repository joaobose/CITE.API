#!/usr/bin/env bash

cmd=""

# general services that will be started
general_services=("API.service")
general_services_ports=("3110")

for i in "${!general_services[@]}" ; do
   cmd="${cmd} & (cd services/${general_services[i]} && node app ${general_services[i]} ${general_services_ports[i]})"
done

cmd=${cmd#" & "}
eval "${cmd}"