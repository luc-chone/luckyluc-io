export { };

declare global {
	// To work around the issue at: https://github.com/p5-types/p5.ts/issues/9
	class MediaElement {
    /**
     *   Extends p5.Element to handle audio and video. In
     *   addition to the methods of p5.Element, it also
     *   contains methods for controlling media. It is not
     *   called directly, but p5.MediaElements are created
     *   by calling createVideo, createAudio, and
     *   createCapture.
     *
     *   @param elt DOM node that is wrapped
     */
		constructor(
			elt: string
		);

    /**
     *   Play an HTML5 media element.
     *   @chainable
     */
		play(): MediaElement;

    /**
     *   Stops an HTML5 media element (sets current time to
     *   zero).
     *   @chainable
     */
		stop(): MediaElement;

    /**
     *   Pauses an HTML5 media element.
     *   @chainable
     */
		pause(): MediaElement;

    /**
     *   Set 'loop' to true for an HTML5 media element, and
     *   starts playing.
     *   @chainable
     */
		loop(): MediaElement;

    /**
     *   Set 'loop' to false for an HTML5 media element.
     *   Element will stop when it reaches the end.
     *   @chainable
     */
		noLoop(): MediaElement;

    /**
     *   Set HTML5 media element to autoplay or not.
     *   @param autoplay whether the element should
     *   autoplay
     *   @chainable
     */
		autoplay(
			autoplay: boolean
		): MediaElement;

    /**
     *   Sets volume for this HTML5 media element. If no
     *   argument is given, returns the current volume.
     *   @return current volume
     */
		volume(): number;

    /**
     *   Sets volume for this HTML5 media element. If no
     *   argument is given, returns the current volume.
     *   @param val volume between 0.0 and 1.0
     *   @chainable
     */
		volume(
			val: number
		): MediaElement;

    /**
     *   If no arguments are given, returns the current
     *   playback speed of the element. The speed parameter
     *   sets the speed where 2.0 will play the element
     *   twice as fast, 0.5 will play at half the speed,
     *   and -1 will play the element in normal speed in
     *   reverse.(Note that not all browsers support
     *   backward playback and even if they do, playback
     *   might not be smooth.)
     *   @return current playback speed of the element
     */
		speed(): number;

    /**
     *   If no arguments are given, returns the current
     *   playback speed of the element. The speed parameter
     *   sets the speed where 2.0 will play the element
     *   twice as fast, 0.5 will play at half the speed,
     *   and -1 will play the element in normal speed in
     *   reverse.(Note that not all browsers support
     *   backward playback and even if they do, playback
     *   might not be smooth.)
     *   @param speed speed multiplier for element playback
     *   @chainable
     */
		speed(
			speed: number
		): MediaElement;

    /**
     *   If no arguments are given, returns the current
     *   time of the element. If an argument is given the
     *   current time of the element is set to it.
     *   @return current time (in seconds)
     */
		time(): number;

    /**
     *   If no arguments are given, returns the current
     *   time of the element. If an argument is given the
     *   current time of the element is set to it.
     *   @param time time to jump to (in seconds)
     *   @chainable
     */
		time(
			time: number
		): MediaElement;

    /**
     *   Returns the duration of the HTML5 media element.
     *   @return duration
     */
		duration(): number;

    /**
     *   Schedule an event to be called when the audio or
     *   video element reaches the end. If the element is
     *   looping, this will not be called. The element is
     *   passed in as the argument to the onended callback.
     *   @param callback function to call when the
     *   soundfile has ended. The media element will be
     *   passed in as the argument to the callback.
     *   @chainable
     */
		onended(
			callback: (
				...args: any[]
			) => any
		): MediaElement;

    /**
     *   Send the audio output of this element to a
     *   specified audioNode or p5.sound object. If no
     *   element is provided, connects to p5's master
     *   output. That connection is established when this
     *   method is first called. All connections are
     *   removed by the .disconnect() method. This method
     *   is meant to be used with the p5.sound.js addon
     *   library.
     *   @param audioNode AudioNode from the Web Audio API,
     *   or an object from the p5.sound library
     */
		connect(
			audioNode:
				| AudioNode
				| object
		): void;

    /**
     *   Disconnect all Web Audio routing, including to
     *   master output. This is useful if you want to
     *   re-route the output through audio effects, for
     *   example.
     */
		disconnect(): void;

    /**
     *   Show the default MediaElement controls, as
     *   determined by the web browser.
     */
		showControls(): void;

    /**
     *   Hide the default mediaElement controls.
     */
		hideControls(): void;

    /**
     *   Schedule events to trigger every time a
     *   MediaElement (audio/video) reaches a playback cue
     *   point. Accepts a callback function, a time (in
     *   seconds) at which to trigger the callback, and an
     *   optional parameter for the callback.
     *
     *   Time will be passed as the first parameter to the
     *   callback function, and param will be the second
     *   parameter.
     *   @param time Time in seconds, relative to this
     *   media element's playback. For example, to trigger
     *   an event every time playback reaches two seconds,
     *   pass in the number 2. This will be passed as the
     *   first parameter to the callback function.
     *   @param callback Name of a function that will be
     *   called at the given time. The callback will
     *   receive time and (optionally) param as its two
     *   parameters.
     *   @param [value] An object to be passed as the
     *   second parameter to the callback function.
     *   @return id ID of this cue, useful for
     *   removeCue(id)
     */
		addCue(
			time: number,
			callback: (
				...args: any[]
			) => any,
			value?: object
		): number;

    /**
     *   Remove a callback based on its ID. The ID is
     *   returned by the addCue method.
     *   @param id ID of the cue, as returned by addCue
     */
		removeCue(
			id: number
		): void;

    /**
     *   Remove all of the callbacks that had originally
     *   been scheduled via the addCue method.
     *   @param id ID of the cue, as returned by addCue
     */
		clearCues(
			id: number
		): void;

    /**
     *   Path to the media element source.
     */
		src: any;
	}
}