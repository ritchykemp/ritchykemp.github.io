import geopandas as gpd
import numpy as np
import math
import csv
import pandas as pd
import os
import json

from git import Repo

PATH_OF_GIT_REPO = r'/home/ubuntu/ritchykemp.github.io/.git/'
COMMIT_MESSAGE = 'comment from python script'
def git_pull():
    try:
        repo = Repo(PATH_OF_GIT_REPO)
        repo.git.pull()
    except:
        print("Error ocured while pulling the code")

def git_push():
    try:
        repo = Repo(PATH_OF_GIT_REPO)
        repo.git.add(update=True)
        repo.index.commit(COMMIT_MESSAGE)
        origin = repo.remote(name='origin')
        origin.push()
    except:
        print('Some error occured while pushing the code')

##########################
#Import Data ############
##########################
#url = "https://covid.ourworldindata.org/data/owid-covid-data.json"
url = "covid19_world/datacovidworld.js"
countries = "covid19_world/world_countries.geojson"
countries_geo = gpd.read_file(countries)
rawdata = pd.read_json(url)
rawdata = rawdata.T
rawdata.index.name ="id"
#rawdata.rename(columns = {0:"id"}, inplace=True)
print (rawdata, countries_geo)

# merging countries GEO + Covid Daten

data = countries_geo.merge(rawdata, on="id", how="left")

print(data.head())
rawdata.to_json('covid19_world/datacovidworld.js')

with open ('covid19_world/datacovidworld.js', 'r') as original: data = original.read()
with open ('covid19_world/datacovidworld.js', 'w') as modified: modified.write("const cov_data =[" + data +"]")





##########################
######## Git Comands #####
##########################
print("pullen vom GIT")
git_pull()

print("Push befehl durchführen")
git_push()

##################
#### DONE ########
##################

print ("DONE")