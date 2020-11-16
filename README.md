# Alexa Skill template "One shot News Live Stream starter"

Following the latest US election results from Germany I found myself continuously switching between different Online live streams like CNN or YouTube.

This is why I wrote a basic Alexa skill to **one shot launch** Live Streams on those Echo Show devices that support browser content. As the approach and user experience is very basic, I don't belive to bring this through certification. So I share the code on GitHub for those of you interested.

The skill is definitely not ready but it saved me some time in my daily routine. Maybe it is useful for somebody at least as a starter for something.

## How does it work

Basically the launch request starts an APL which itself will redirect to a browser opening a web page which then contains the video content.

## How to start

"*Alexa, open News Flash*"

## How to configure your stream of choice

Within the APL document you can find the hardcoded link which you may replace with the url of your choice. For YouTube links I recommend to use the **embeded url notation**.

There is no reason not to use other links to video material which is available online. The example in the code uses a link that contains a CNN live stream.

## Some things to mention

- The behaviour of the skill seems to depend on the default browser which is configured within your device settings (Silk vs. FireFox). Find out what works best for you.

- To get the video to play in full screen you will likely need manual touch interaction on most devices.

- An automatic fullscreen & autoplay experience did not work for me.

- Echo Spot will not work (no browser support).