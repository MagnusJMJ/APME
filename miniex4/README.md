# [Speedball](https://rawgit.com/MagnusJMJ/APME/master/miniex4/index.html)
![Screenshot](https://github.com/MagnusJMJ/APME/blob/master/miniex4/speedball.png)

### The Negative Feedback Loop
There is a ball in the center of the canvas, balanced perfectly in a gravity well. You can move the ball with the arrowkeys,
and it will accelerate and bounce off the edge of the canvas. It continuously "bleeds" energy to air resistance, and also loses
energy when it hits the wall. If left alone, the ball will simply be pulled back towards the center. It keeps slinging itself past the point it is trying to reach, floating back and forth, until it loses enough speed to stay there. This is a negative feedback loop, meaning it strives to reach a balanced state, and all input (i.e. when you move the ball with your arrowkeys) is eventually negated.

### The Positive Feedback Loop
The program has a second mode that produces a positive feedback loop. This is an amplifying system, where all the things that should
slow the ball down, speed it up. The ball will bounce off walls with more speed than it hit them with, causing it to reach the opposite wall faster, in turn making the ball faster yet. In this mode, the ball is very hard to keep still, as even the tiniest movement is eventually amplified until the ball breaks the primitive physics of the program.

*NB:* When in the stabilizing/negative mode, the ball may occasionally have a seizure when it hits the edge of the canvas. This is a bug that I was not able to resolve within the timeframe of the exercise, and should not be considered a feature of the program.
