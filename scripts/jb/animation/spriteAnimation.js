// JavaScript Document

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $*/

function Animation_jb(img_url, json_obj) {"use strict";
	var context = this, interval, ready_bool = false;

	this.tag_$ = $('<div></div>');
	this.currentFrame = 0;
	this.frames_json = json_obj;

	this.onReady = function() {
	};

	this.stop = function() {
		clearInterval(interval);
	};

	var _initAnim = function() {

		context.firstFrame_json = context.frames_json.frames[0].frame;
		context.tag_$.width(context.firstFrame_json.w);
		context.tag_$.height(context.firstFrame_json.h);
		context.tag_$.css('background-image', "url(" + img_url + ")");
		context.totalFrames = context.frames_json.frames.length;

		ready_bool = true;

	};
	var _nextFrameLoop = function() {
		var nextFrame = (context.currentFrame + 1) % context.totalFrames;
		context.gotoFrame(nextFrame);

	};

	this.loop = function() {
		clearInterval(interval);
		interval = setInterval(_nextFrameLoop, 10);
	};
	this.play = function() {
		clearInterval(interval);
		interval = setInterval(this.nextFrame, 10);

	};

	this.nextFrame = function() {
		//trace ("this.nextFrame()");
		var nextFrame = context.currentFrame + 1;
		if (nextFrame < context.totalFrames) {
			context.gotoFrame(context.currentFrame + 1);
		} else {
			context.stop();
		}
	};
	this.lastFrame = function() {

		context.gotoFrame(context.totalFrames - 1);

	};

	this.gotoAndStop = function(frame_num) {

		this.stop();
		this.gotoFrame(frame_num);

	};

	this.gotoFrame = function(frame_num) {
		if (ready_bool && frame_num > 0 && frame_num <= context.totalFrames) {
			context.currentFrame = frame_num;
			var img_pos = context.frames_json.frames[frame_num - 1].frame;
			context.tag_$.css('background-position', -img_pos.x + 'px ' + -img_pos.y + 'px ');
		}

	};

	_initAnim();

}