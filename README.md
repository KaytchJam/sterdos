# STERDOS
___

Mockup project for calculating the "Bus-Transit-Score" of a particular location in the Houston Area, where a location is defined by a Latitude-Longitude pair.

#### The Premise

Plays off the idea of the "15-minute city." How far do I need to walk to reach a source of public transit, and secondly: how many different sources are close to me?

#### Methodology + Data

The "average walking distance" in 15 minutes used in this project is *1,143 m/s*. So when computing Bus-Mobility score sthe bus stops considered are those within a 1,143 raidus of the input location. This value is extrapolated from a 2011 Research Article on Walking Speed, *"Association between Walking Speed and Age in Healthy, Free-Living Individuals Using Mobile Accelerometry—A Cross-Sectional Study"*, by Michaela Schimpl et al. 

Here is a link to the study: https://doi.org/10.1371/journal.pone.0023299. 

The average walking speed from the closed dataset from the paper in meters per second, 1.27, is referenced to get our 1,143 meters calculation $(1.27 \frac{m}{s} * 60 \frac{s}{min} * 15 \frac{min}{1})$.