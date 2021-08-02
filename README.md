# TETRA
An audio visualizer created in 2021 that uses the Web Audio API to create a visualizer from a 3D CSS tetrahedron.

[View Demo]()

The distance of each of the vertices from the centroid changes dynamically in based on the audio. The dynamic changes to the geometry are implemented purely* in CSS. The audio data is passed in via CSS variables and the CSS performs the neccessary math to reconfigure the tetrahedron in 3D space.

This is an updated verion of my [2018 tetrahedron visualizer](https://codepen.io/hmeinertrita/pen/XxKpaB?editors=1010).

Resources:

* [Make Your Browser Dance by Ruth John](https://24ways.org/2013/make-your-browser-dance/)
* [Trigonometry in CSS by stereokai](https://gist.github.com/stereokai/7666bfe93929b14c2dced148c79e0e97)
* [CSS Square Root (CSS Only) by Skya Tura](https://codepen.io/SkyaTura/pen/OvOpad)
* Power Series Expansions of Inverse Trigonometric Functions by ProofWiki
  * [Arcsine](https://proofwiki.org/wiki/Power_Series_Expansion_for_Real_Arcsine_Function)
  * [Arccosine](https://proofwiki.org/wiki/Power_Series_Expansion_for_Real_Arccosine_Function)
  * [Arctangent](https://proofwiki.org/wiki/Power_Series_Expansion_for_Real_Arctangent_Function)

\*Square roots, necessary for the geometric math, *can* be approximated to a sufficient degree with CSS. However, CSS seems to have a limit on the number of nested calc() calls that makes such approximation unusable. See comments in [this file](https://github.com/hmeinertrita/TETRA/blob/main/sqrt.css) for more.
