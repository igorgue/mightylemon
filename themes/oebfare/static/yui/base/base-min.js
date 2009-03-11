/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0pr1
*/
YUI.add("base",function(A){var J=A.Lang,H=A.Object,I=":",E="destroy",N="init",G="value",M="initialized",F="destroyed",B="initializer",K="destructor";var C=A.Event.Target.prototype;var D=function(){A.Attribute.call(this);this.init.apply(this,arguments);};D.NAME="base";D.ATTRS={intialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};var P={};D.build=function(S,X,W){var a=D.build,O,Y,V,R,Z=S.NAME;if(W){V=W.aggregates;R=W.dynamic;}O=(R)?a._template(S):S;O._yuibuild={id:null,exts:[],dynamic:R};V=(V)?a.AGGREGATES.concat(V):a.AGGREGATES;var L=X.length,U=V.length,T;if(R&&V){for(T=0;T<U;T++){var Q=V[T];if(H.owns(S,Q)){O[Q]=J.isArray(S[Q])?[]:{};}}A.aggregate(O,S,true,V);}for(T=0;T<L;T++){Y=X[T];if(V){A.aggregate(O,Y,true,V);}A.mix(O,Y,true,null,1);O._yuibuild.exts.push(Y);Z=Z+":"+A.stamp(Y);}O._yuibuild.id=Z;O.prototype.hasImpl=a._hasImpl;if(R){O.NAME=S.NAME;O.prototype.constructor=O;}return O;};A.mix(D.build,{AGGREGATES:["ATTRS","PLUGINS"],_template:function(L){function O(){O.superclass.constructor.apply(this,arguments);var S=O._yuibuild.exts,Q=S.length;for(var R=0;R<Q;R++){S[R].apply(this,arguments);}return this;}A.extend(O,L);return O;},_hasImpl:function(O){if(this.constructor._yuibuild){var R=this.constructor._yuibuild.exts,L=R.length,Q;for(Q=0;Q<L;Q++){if(R[Q]===O){return true;}}}return false;}});D.create=function(O,R,Q){var T=D.build(O,R,{dynamic:true}),L=A.Array(arguments,2,true);function S(){}S.prototype=T.prototype;return T.apply(new S(),L);};D.prototype={init:function(L){this.name=this.constructor.NAME;this.publish(N,{queuable:false,defaultFn:this._defInitFn});this.fire(N,L);return this;},destroy:function(){this.publish(E,{queuable:false,defaultFn:this._defDestroyFn});this.fire(E);return this;},_defInitFn:function(L){P[A.stamp(this)]=this;this._initHierarchy(L);this._conf.remove(M,G);this.set(M,true);},_defDestroyFn:function(){this._destroyHierarchy();delete P[this._yuid];this._conf.remove(F,G);this.set(F,true);},_getClasses:function(){if(!this._classes){var O=this.constructor,L=[];while(O&&O.prototype){L.unshift(O);O=O.superclass?O.superclass.constructor:null;}this._classes=L;}return this._classes.concat();},_initHierarchy:function(T){var S,Q=this._getClasses();for(var O=0,L=Q.length;O<L;O++){S=Q[O];if(S._yuibuild&&S._yuibuild.exts&&!S._yuibuild.dynamic){for(var U=0,R=S._yuibuild.exts.length;U<R;U++){S._yuibuild.exts[U].apply(this,arguments);}}this._initAtts(S.ATTRS,T);if(H.owns(S.prototype,B)){S.prototype[B].apply(this,arguments);}}},_destroyHierarchy:function(){var Q,O=this._getClasses();for(var L=O.length-1;L>=0;L--){Q=O[L];if(H.owns(Q.prototype,K)){Q.prototype[K].apply(this,arguments);}}},toString:function(){return this.constructor.NAME+"["+A.stamp(this)+"]";},subscribe:function(){var L=arguments;L[0]=this._prefixEvtType(L[0]);return C.subscribe.apply(this,L);},fire:function(){var L=arguments;if(J.isString(L[0])){L[0]=this._prefixEvtType(L[0]);}else{if(L[0].type){L[0].type=this._prefixEvtType(L[0].type);}}return C.fire.apply(this,L);},publish:function(){var L=arguments;L[0]=this._prefixEvtType(L[0]);return C.publish.apply(this,L);},after:function(){var L=arguments;L[0]=this._prefixEvtType(L[0]);return C.after.apply(this,L);},unsubscribe:function(R,Q,O){var L=arguments;if(J.isString(L[0])){L[0]=this._prefixEvtType(L[0]);}return C.unsubscribe.apply(this,L);},unsubscribeAll:function(O){var L=arguments;L[0]=this._prefixEvtType(L[0]);return C.unsubscribeAll.apply(this,L);},_prefixEvtType:function(L){if(L.indexOf(I)===-1&&this.name){L=this.name+":"+L;}return L;}};A.mix(D,A.Attribute,false,null,1);A.Base=D;},"3.0.0pr1",{requires:["attribute"]});