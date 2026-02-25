# STERDOS
___

Mockup project for calculating the "Bus-Transit-Score" of a particular location in the Houston Area, where a location is defined by a Latitude-Longitude pair. Along with the score, a list of nearby bus stops (those within 15 minute walking distance, using Haversine metric) are returned to the user. This project was made possible via the Houston METRO API. It was deployed using GCP.

Note for those that try to run this code locally: The SQLITE database used is not included in the source files here so any latitude-longitude queries will fail. If you'd like me to send the data to you just shoot me an email or something.

#### Primary Dependencies

- NextJS
- React
- Tailwind
- Better-Sqlite

#### Running the Project Locally

Go to the src directory and do `npm run dev` or `docker build -t <SOME_NAME> .` then `docker run -p 3000:3000 <SOME_NAME>`. As I've stated in the note above, without the data local queries will fail.


#### The Premise

Plays off the idea of the "15-minute city." How far do I need to walk to reach a source of public transit, and secondly: how many different sources are close to me?

#### Methodology + Data

The "average walking distance" in 15 minutes used in this project is *1,143 m/s*. So when computing Bus-Mobility score sthe bus stops considered are those within a 1,143 raidus of the input location. This value is extrapolated from a 2011 Research Article on Walking Speed, *"Association between Walking Speed and Age in Healthy, Free-Living Individuals Using Mobile Accelerometry—A Cross-Sectional Study"*, by Michaela Schimpl et al. 

Here is a link to the study: https://doi.org/10.1371/journal.pone.0023299. 

The average walking speed from the closed dataset from the paper in meters per second, 1.27, is referenced to get our 1,143 meters calculation $(1.27 \frac{m}{s} * 60 \frac{s}{min} * 15 \frac{min}{1})$.