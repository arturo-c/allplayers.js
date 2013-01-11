var JSON;JSON||(JSON={});
(function(){function a(a){return 10>a?"0"+a:a}function b(a){f.lastIndex=0;return f.test(a)?'"'+a.replace(f,function(a){var b=j[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function c(a,f){var d,j,r,s,p=e,m,l=f[a];l&&("object"===typeof l&&"function"===typeof l.toJSON)&&(l=l.toJSON(a));"function"===typeof h&&(l=h.call(f,a,l));switch(typeof l){case "string":return b(l);case "number":return isFinite(l)?String(l):"null";case "boolean":case "null":return String(l);case "object":if(!l)return"null";
e+=g;m=[];if("[object Array]"===Object.prototype.toString.apply(l)){s=l.length;for(d=0;d<s;d+=1)m[d]=c(d,l)||"null";r=0===m.length?"[]":e?"[\n"+e+m.join(",\n"+e)+"\n"+p+"]":"["+m.join(",")+"]";e=p;return r}if(h&&"object"===typeof h){s=h.length;for(d=0;d<s;d+=1)"string"===typeof h[d]&&(j=h[d],(r=c(j,l))&&m.push(b(j)+(e?": ":":")+r))}else for(j in l)Object.prototype.hasOwnProperty.call(l,j)&&(r=c(j,l))&&m.push(b(j)+(e?": ":":")+r);r=0===m.length?"{}":e?"{\n"+e+m.join(",\n"+e)+"\n"+p+"}":"{"+m.join(",")+
"}";e=p;return r}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+":"+a(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var d=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
f=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,g,j={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},h;"function"!==typeof JSON.stringify&&(JSON.stringify=function(a,b,f){var d;g=e="";if("number"===typeof f)for(d=0;d<f;d+=1)g+=" ";else"string"===typeof f&&(g=f);if((h=b)&&"function"!==typeof b&&("object"!==typeof b||"number"!==typeof b.length))throw Error("JSON.stringify");return c("",{"":a})});
"function"!==typeof JSON.parse&&(JSON.parse=function(a,b){function f(a,e){var c,d,g=a[e];if(g&&"object"===typeof g)for(c in g)Object.prototype.hasOwnProperty.call(g,c)&&(d=f(g,c),void 0!==d?g[c]=d:delete g[c]);return b.call(a,e,g)}var e;a=String(a);d.lastIndex=0;d.test(a)&&(a=a.replace(d,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),"function"===typeof b?f({"":e},""):e;throw new SyntaxError("JSON.parse");})})();var drupal=drupal||{};drupal.hasStorage="undefined"!==typeof Storage;drupal.hasStorage&="undefined"!==typeof JSON;drupal.retrieve=function(a){var b=null;if(a&&drupal.hasStorage&&(b=JSON.parse(localStorage.getItem(a)))&&(new Date).getTime()>b.expires)localStorage.removeItem(a),b={};return b};
drupal.store=function(a,b,c){a&&drupal.hasStorage&&(b.expires=1E3*(c||3600)+(new Date).getTime(),localStorage.setItem(a,JSON.stringify(b)))};drupal.clear=function(a){a&&drupal.hasStorage&&localStorage.removeItem(a)};
drupal.api=function(){return{resource:"",cacheId:"",isMobile:jQuery.hasOwnProperty("mobile"),endpoint:function(){return drupal.endpoint||""},getURL:function(a){if(a&&a.uri)return a.uri;var b=this.endpoint(),b=b+(this.resource?"/"+this.resource:"");return b+=a&&a.id?"/"+a.id:""},loading:function(a){this.isMobile&&(a?jQuery("body").addClass("ui-loading"):jQuery("body").removeClass("ui-loading"))},call:function(a,b,c,d,f){var e=this,g=this;a={url:a,dataType:b,type:c,success:function(a,b){e.loading(!1);
"success"==b?f&&f(a):console.log("Error: "+b)},error:function(a){g.loading(!1);console.log(a.statusText);f&&f(null)}};d&&(a.data=d);this.loading(!0);jQuery.ajax(a)},get:function(a,b,c,d,f){var e=typeof b;"object"===e?(d=c,c=b,b=""):"function"===e&&(d=b,b="");var g=this.getURL(a),g=g+(b?"/"+b:""),g=g+".jsonp",g=g+(c?"?"+decodeURIComponent(jQuery.param(c,!0)):"");if(f&&(this.cacheId=g.replace(/[^A-z0-9\-]/g,""),(a=drupal.retrieve(this.cacheId))&&a.url===g)){d(a.data);return}this.call(g,"jsonp","GET",
null,function(a){return function(b){f&&drupal.store(a.cacheId,{url:g,data:b});d(b)}}(this))},execute:function(a,b,c){a=this.getURL(b)+"/"+a;this.call(a,"json","POST",b,c)},save:function(a,b){var c=a.id?"PUT":"POST";this.call(this.getURL(a),"json",c,a,b)},remove:function(a,b){this.cacheId&&drupal.clear(this.cacheId);this.call(this.getURL(a),"json","DELETE",null,b)}}};drupal=drupal||{};
drupal.entity=function(a,b,c){this.options=jQuery.extend({store:!0,expires:3600},"undefined"===typeof c?{}:c);a&&(this.properties={},this.set(a));b&&this.load(b)};drupal.entity.index=function(a,b,c,d){d=jQuery.extend({store:!0},d||{});"function"===typeof b&&(c=b,b={});var f=new a({});f.api.get({},f.getQuery(b),function(b){if(b)for(var f=b.length;f--;)b[f]=new a(b[f],null,d);c&&c(b)},d.store)};
drupal.entity.prototype.setProperties=function(a,b){if(a)for(var c in a)this[c]=b[c]||this[c]||a[c],this.properties[c]=c};drupal.entity.prototype.update=function(a,b){a&&this.set(a);b&&b.call(this,this)};drupal.entity.prototype.set=function(a){this.api=this.api||null;this.setProperties({id:"",uri:""},a);this.entityName="entity"};drupal.entity.prototype.get=function(){var a={};if(this.properties)for(var b in this.properties)a[b]=this[b];return a};
drupal.entity.prototype.getPOST=function(){var a=this.get();a.id||delete a.id;return a};drupal.entity.prototype.getQuery=function(a){return a||{}};drupal.entity.prototype.load=function(a){this.id||a(null);this.api&&this.api.get(this.get(),{},function(b){return function(c){c||a(null);b.update(c,a)}}(this),this.options.store)};drupal.entity.prototype.save=function(a){this.api&&this.api.save(this.getPOST(),function(b){return function(c){b.update(c,a)}}(this))};
drupal.entity.prototype.remove=function(a){this.id&&this.api.remove(this.get(),a)};drupal=drupal||{};
drupal.cookie=function(a,b,c){if(1<arguments.length&&(!/Object/.test(Object.prototype.toString.call(b))||null===b||void 0===b)){c=$.extend({},c);if(null===b||void 0===b)c.expires=-1;if("number"===typeof c.expires){var d=c.expires,f=c.expires=new Date;f.setDate(f.getDate()+d)}b=String(b);return document.cookie=[encodeURIComponent(a),"=",c.raw?b:encodeURIComponent(b),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}c=
b||{};for(var d=c.raw?function(a){return a}:decodeURIComponent,f=document.cookie.split("; "),e=0,g;g=f[e]&&f[e].split("=");e++)if(d(g[0])===a)return d(g[1]||"");return null};drupal.system=function(a,b){drupal.entity.call(this,{},a,b)};drupal.system.prototype=new drupal.entity;drupal.system.prototype.constructor=drupal.system;drupal.system.api=jQuery.extend(new drupal.api,{resource:"system"});
drupal.system.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="system";this.api=drupal.system.api;this.user=new drupal.user(a.user);this.user.setSession(a.session_name,a.sessid)};drupal.system.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{user:this.user.get()})};drupal.system.prototype.load=function(a){this.api.execute("connect",null,function(b){return function(c){b.update(c,a)}}(this))};
drupal.system.prototype.get_variable=function(a,b,c){this.api.execute("get_variable",{name:a,"default":b},c)};drupal.system.prototype.set_variable=function(a,b,c){this.api.execute("set_variable",{name:a,value:b},c)};drupal.system.prototype.del_variable=function(a,b){this.api.execute("del_variable",{name:a},b)};drupal=drupal||{};drupal.node=function(a,b,c){drupal.entity.call(this,a,b,c)};drupal.node.prototype=new drupal.entity;drupal.node.prototype.constructor=drupal.node;
drupal.node.api=jQuery.extend(new drupal.api,{resource:"node"});drupal.node.index=function(a,b,c){drupal.entity.index(drupal.node,a,b,c)};drupal.node.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="node";this.api=drupal.node.api;this.id=a.nid||this.id||0;this.setProperties({nid:0,title:"",type:"",status:0,uid:0},a)};drupal.node.prototype.getQuery=function(a){a=drupal.entity.prototype.getQuery.call(this,a);a.type&&(a["parameters[type]"]=a.type,delete a.type);return a};
drupal=drupal||{};drupal.current_user=null;drupal.user=function(a,b,c){drupal.entity.call(this,a,b,c)};drupal.user.prototype=new drupal.entity;drupal.user.prototype.constructor=drupal.user;drupal.user.api=jQuery.extend(new drupal.api,{resource:"user"});drupal.user.index=function(a,b,c){drupal.entity.index(drupal.user,a,b,c)};
drupal.user.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="user";this.api=drupal.user.api;this.id=a.uid||this.id||0;this.pass=a.pass||this.pass||"";this.setProperties({name:"",mail:"",status:1},a)};drupal.user.prototype.setSession=function(a,b){this.sessid=b;this.id&&a&&(this.session_name=a,drupal.cookie(a,b),drupal.current_user=this)};
drupal.user.prototype.login=function(a){this.api&&this.api.execute("login",{username:this.name,password:this.pass},function(b){return function(c){b.update(c.user);b.setSession(c.session_name,c.sessid);a&&a.call(b,b)}}(this))};drupal.user.prototype.register=function(a){this.api&&this.api.execute("register",this.getPOST(),function(b){return function(c){b.update(c,a)}}(this))};drupal.user.prototype.logout=function(a){this.api&&this.api.execute("logout",null,a)};
drupal.user.prototype.getPOST=function(){var a=drupal.entity.prototype.getPOST.call(this);a.pass=this.pass;return a};var allplayers=allplayers||{};
allplayers.date=function(a,b,c){this.newDate=function(a){return"string"===typeof a?new Date(a):"object"===typeof a?a:new Date};this.start=this.newDate(a);this.end=this.newDate(b);this.repeat=c?{interval:c.interval?c.interval:1,freq:c.freq?c.freq:"DAILY",until:this.newDate(c.until),bymonth:c.bymonth?c.bymonth:[],bymonthday:c.bymonthday?c.bymonthday:[],byday:c.byday?c.byday:[],exdate:c.exdate?c.exdate:[],rdate:c.rdate?c.rdate:[]}:null};
if(!Date.prototype.toISOString){var padzero=function(a){return 10>a?"0"+a:a},pad2zeros=function(a){100>a&&(a="0"+a);10>a&&(a="0"+a);return a};Date.prototype.toISOString=function(){var a=this.getUTCFullYear()+"-",a=a+(padzero(this.getUTCMonth()+1)+"-"),a=a+(padzero(this.getUTCDate())+"T"),a=a+(padzero(this.getUTCHours())+":"),a=a+(padzero(this.getUTCMinutes())+":"),a=a+(padzero(this.getUTCSeconds())+".");return a+=pad2zeros(this.getUTCMilliseconds())+"Z"}}
allplayers.date.prototype.update=function(a,b,c){this.start=a?this.newDate(a):this.start;this.end=b?this.newDate(b):this.end;c&&(c.until=this.newDate(c.until),jQuery.extend(this.repeat,c))};allplayers.date.prototype.addDate=function(a,b){b=this.newDate(b);this.repeat[a].push(b)};allplayers.date.prototype.addException=function(a){this.addDate("except",a)};allplayers.date.prototype.addRDate=function(a){this.addDate("rdate",a)};
allplayers.date.prototype.get=function(){var a=0,b={start:this.start.toISOString(),end:this.end.toISOString()};if(this.repeat){b.repeat={interval:this.repeat.interval,freq:this.repeat.freq,until:this.repeat.until.toISOString(),bymonth:this.repeat.bymonth,bymonthday:this.repeat.bymonthday,byday:this.repeat.byday,exdate:[],rdate:[]};for(a=this.repeat.exdate.length;a--;)b.repeat.exdate.push(this.repeat.exdate[a].toISOString());for(a=this.repeat.rdate.length;a--;)b.repeat.rdate.push(this.repeat.rdate[a].toISOString())}return b};
allplayers=allplayers||{};allplayers.event=function(a,b,c){drupal.node.call(this,a,b,c)};allplayers.event.prototype=new drupal.node;allplayers.event.prototype.constructor=allplayers.event;allplayers.event.api=jQuery.extend(new drupal.api,{resource:"events"});allplayers.event.index=function(a,b,c){drupal.entity.index(allplayers.event,a,b,c)};
allplayers.event.prototype.set=function(a){drupal.node.prototype.set.call(this,a);this.entityName="event";this.api=allplayers.event.api;this.id=a.uuid||a.id||this.id||"";this.setProperties({allDay:!1,gids:[],description:"",resources:[],competitors:{},category:"Other"},a);this.date=new allplayers.date(a.start,a.end);this.start=this.date.start;this.end=this.date.end};
allplayers.event.prototype.get=function(){return jQuery.extend(drupal.node.prototype.get.call(this),{allDay:this.allDay,gids:this.gids,description:this.description,resources:this.resources,competitors:this.competitors,category:this.category,date_time:this.date.get()})};allplayers=allplayers||{};allplayers.group=function(a,b,c){drupal.node.call(this,a,b,c)};allplayers.group.prototype=new drupal.node;allplayers.group.prototype.constructor=allplayers.group;
allplayers.group.api=jQuery.extend(new drupal.api,{resource:"groups"});allplayers.group.index=function(a,b,c){drupal.entity.index(allplayers.group,a,b,c)};
allplayers.group.prototype.set=function(a){drupal.node.prototype.set.call(this,a);this.entityName="group";this.api=allplayers.group.api;this.id=a.uuid||a.id||this.id||"";this.has_children=a.hasOwnProperty("has_children")?a.has_children:!!this.has_children;this.location=a.location||this.location||new allplayers.location;this.setProperties({activity_level:0,list_in_directory:0,active:!1,registration_fees_enabled:"",approved_for_payment:"",accept_amex:"",primary_color:"",secondary_color:"",node_status:0,
logo:"",url:"",groups_above_uuid:[],registration_link:"",registration_text:""},a)};
allplayers.group.prototype.get=function(){return jQuery.extend(drupal.node.prototype.get.call(this),{location:this.location.get(),activity_level:this.activity_level,list_in_directory:this.list_in_directory,active:this.active,registration_fees_enabled:this.registration_fees_enabled,approved_for_payment:this.approved_for_payment,accept_amex:this.accept_amex,primary_color:this.primary_color,secondary_color:this.secondary_color,node_status:this.node_status,logo:this.logo,uri:this.uri,url:this.url,groups_above_uuid:this.groups_above_uuid,
registration_link:this.registration_link,registration_text:this.registration_text})};allplayers.group.prototype.getEvents=function(a,b){this.api.get(this,"events",a,function(a){for(var d in a)a[d]=new allplayers.event(a[d]);b(a)},!0)};allplayers.group.prototype.getUpcomingEvents=function(a,b){this.api.get(this,"events/upcoming",a,function(a){for(var d in a)a[d]=new allplayers.event(a[d]);b(a)},!0)};allplayers.group.prototype.getGroupTree=function(a,b){this.api.get(this,"subgroups/tree",a,b,!1)};
allplayers.group.prototype.find=function(a,b){this.api.get(this,"subgroups/find",{query:a},b)};allplayers=allplayers||{};allplayers.location=function(a,b,c){drupal.entity.call(this,a,b,c)};allplayers.location.prototype=new drupal.entity;allplayers.location.prototype.constructor=allplayers.location;allplayers.location.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.setProperties({street:0,city:"",state:"",zip:"",country:"",latitude:"",longitude:""},a)};
allplayers.location.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{street:this.street,city:this.city,state:this.state,zip:this.zip,country:this.country,latitude:this.latitude,longitude:this.longitude})};allplayers=allplayers||{};
(function(a){var b={dialog:"#calendar-dialog-form"};allplayers.calendars={};a.fn.allplayers_calendar||(a.fn.allplayers_calendar=function(b){return a(this).each(function(){allplayers.calendars[a(this).selector]||new allplayers.calendar(a(this),b)})});allplayers.calendar=function(c,d){var f=this;d=a.extend(b,d,{header:{left:"prev,next today",center:"title",right:"month,agendaWeek,agendaDay"},editable:!0,dayClick:function(a,b,f,c){console.log(a);console.log(b);console.log(f);console.log(c)},eventClick:function(a,
b,f){console.log(a);console.log(b);console.log(f)},eventDrop:function(a){a.obj.update(a);a.obj.save()},eventResizeStop:function(a){a.obj.update(a);a.obj.save()},events:function(a,b,c){f.getEvents(a,b,c)}});this.dialog=a(d.dialog,c).hide();allplayers.calendars[d.id]=this;this.uuid="";c.fullCalendar(d)};allplayers.calendar.prototype.onEventClick=function(){console.log("Event has been clicked")};allplayers.calendar.prototype.getUUID=function(a){if(this.uuid)a.call(this);else{var b=this;allplayers.api.searchGroups({search:"Spring Soccer 2011"},
function(f){b.uuid=f[0].uuid;a.call(b)})}};allplayers.calendar.prototype.getEvents=function(a,b,f){var e=a.getFullYear()+"-",e=e+(a.getMonth()+1+"-"),e=e+a.getDate(),g=b.getFullYear()+"-",g=g+(b.getMonth()+1+"-"),g=g+b.getDate();this.getUUID(function(){allplayers.api.getGroupEvents(this.uuid,{start:e,end:g,fields:"*",limit:0,offset:0},function(a){for(var b=a.length;b--;)a[b].id=a[b].uuid,a[b].obj=new allplayers.event(a[b]);f(a)})})}})(jQuery);
(function(a){jQuery.fn.moreorless=function(b,c,d){b=b||100;c=c||"more";d=d||"less";this.each(function(){this.element=a(this);this.div_height=0;this.forceHeight=!1;this.link||(this.link=a(document.createElement("div")).css({cursor:"pointer"}),this.link.addClass("moreorless_link"));this.content||(this.content=this.element.wrap("<div></div>").parent(),this.content.addClass("moreorless_content expanded"));this.wrapper||(this.wrapper=this.content.wrap("<div></div>").parent(),this.wrapper.addClass("moreorless_wrapper").css("position",
"relative"));this.expand=function(a){this.link.remove();a?(this.link.html(d),a!=this.div_expanded&&this.content.addClass("expanded").animate({height:this.div_height},function(a){return function(){a.css("overflow","").height("inherit")}}(this.content)),this.forceHeight&&this.content.after(this.link)):(this.link.html(c),a!=this.div_expanded&&this.content.removeClass("expanded").animate({height:b},function(a){return function(){a.css("overflow","hidden")}}(this.content)),this.content.after(this.link));
this.link.unbind().bind("click",function(a){return function(b){b.preventDefault();b.stopPropagation();b=!a.content.hasClass("expanded");a.forceHeight=b;a.expand(b)}}(this));this.div_expanded=a;return this.content};this.checkHeight=function(){this.forceHeight=!1;this.div_height=this.element.height();this.expand(this.div_height<b)};var f=0;a(window).unbind("resize").bind("resize",function(a){return function(){clearTimeout(f);f=setTimeout(function(){a.checkHeight()},100)}}(this));this.element.unbind("resize").bind("resize",
function(a){return function(){clearTimeout(f);f=setTimeout(function(){a.checkHeight()},100)}}(this));this.checkHeight()})}})(jQuery);
(function(a){a.fn.treeselect=function(b){b=a.extend({colwidth:18,default_value:{},selected:null,treeloaded:null,load:null,searcher:null,deepLoad:!1,onbuild:null,postbuild:null,inputName:"treeselect",showRoot:!1,selectAll:!1,selectAllText:"Select All"},b);var c={},d=function(b,c){this.root=!!c;b.title=b.title||"anonymous";a.extend(this,{id:0,nodeloaded:!1,allLoaded:!1,value:0,title:"",url:"",has_children:!0,children:[],data:{},level:0,odd:!1,checked:!1,busy:!1,display:a(),input:a(),link:a(),span:a(),
childlist:a(),exclude:{}},b);this.isTreeNode=!0;this.loading=!1;this.loadqueue=[]};d.prototype.setBusy=function(a){a!=this.span.hasClass("treebusy")&&((this.busy=a)?this.span.addClass("treebusy"):this.span.removeClass("treebusy"))};d.prototype.isLoaded=function(){var a=this.nodeloaded,a=a|c.hasOwnProperty(this.id),a=a|!this.has_children;return a|=this.has_children&&0<this.children.length};d.prototype.loadNode=function(a,e){this.loading?a&&this.loadqueue.push(a):(this.loading=!0,b.load&&!this.isLoaded()?
(e||this.setBusy(!0),b.load(this,function(b){return function(d){b.nodeloaded||(b=jQuery.extend(b,d),b.nodeloaded=!0,c[b.id]=b.id,b.build());a&&a(b);for(var h in b.loadqueue)b.loadqueue[h](b);b.loadqueue.length=0;e||b.setBusy(!1)}}(this))):a&&a(this),this.loading=!1)};d.prototype.loadAll=function(a,b,c,d){d=d||{};this.loadNode(function(h){b&&b(h);var n=h.children.length,k=n;if(!n||d.hasOwnProperty(h.id))a&&a(h);else{d[h.id]=h.id;for(c||h.setBusy(!0);n--;)h.children[n].loadAll(function(){k--;k||(a&&
a(h),c||h.setBusy(!1))},b,c,d)}})};d.prototype.expand=function(a){this.checked=this.input.is(":checked");a?(this.link.removeClass("collapsed").addClass("expanded"),this.span.removeClass("collapsed").addClass("expanded"),this.childlist.show("fast")):0<this.span.length&&(this.link.removeClass("expanded").addClass("collapsed"),this.span.removeClass("expanded").addClass("collapsed"),this.childlist.hide("fast"));a&&!this.isLoaded()&&this.loadNode(function(a){a.checked&&a.select(a.checked);a.expand(!0)})};
d.prototype.selectChildren=function(a){for(var b=this.children.length;b--;)this.children[b].select(a,!0)};d.prototype.check=function(a){this.checked=a;this.input.attr("checked",a);b.selected&&b.selected(this,!0)};d.prototype.select=function(a,c){this.input.hasClass("treenode-no-select")||(this.checked=a,this.input.attr("checked",a));a&&b.deepLoad?this.loadAll(function(d){d.selectChildren(a);b.selected&&b.selected(d,!c)}):(this.selectChildren(a),b.selected&&b.selected(this,!c))};d.prototype.build_treenode=
function(){var b=a(),b=a(document.createElement(this.root?"div":"li"));b.addClass("treenode");b.addClass(this.odd?"odd":"even");return b};d.prototype.build_input=function(c){if(b.inputName){if("undefined"!==typeof this.exclude[this.id])this.input=a(document.createElement("div")),this.input.addClass("treenode-no-select");else{this.input=a(document.createElement("input"));var d=this.value||this.id;this.input.attr({type:"checkbox",value:d,name:b.inputName+"-"+d,checked:this.checked}).addClass("treenode-input");
this.input.bind("click",function(b){return function(c){c=a(c.target).is(":checked");b.expand(c);b.select(c)}}(this));this.root&&!b.showRoot&&this.input.hide()}this.input.css("left",c+"px")}return this.input};d.prototype.build_link=function(b){b.css("cursor","pointer").addClass("collapsed");b.bind("click",{node:this},function(b){b.preventDefault();b.data.node.expand(a(b.target).hasClass("collapsed"))});return b};d.prototype.build_span=function(b){if((!this.root||this.showRoot)&&this.has_children)this.span=
this.build_link(a(document.createElement("span")).attr({"class":"treeselect-expand"})),this.span.css("left",b+"px");return this.span};d.prototype.build_title=function(b){if((!this.root||this.showRoot)&&this.title)this.nodeLink=a(document.createElement("a")).attr({"class":"treeselect-title",href:this.url,target:"_blank"}).css("marginLeft",b+"px").text(this.title),this.link=this.has_children?this.build_link(this.nodeLink.clone()):a(document.createElement("div")).attr({"class":"treeselect-title"}).css("marginLeft",
b+"px").text(this.title);return this.link};d.prototype.build_children=function(){this.childlist=a();if(0<this.children.length){this.childlist=a(document.createElement("ul"));var b=this.odd,c;for(c in this.children)this.children.hasOwnProperty(c)&&(b=!b,this.children[c]=new d(a.extend(this.children[c],{level:this.level+1,odd:b,checked:this.checked,exclude:this.exclude})),this.childlist.append(this.children[c].build()))}return this.childlist};d.prototype.build=function(){var c=5,d=null;if(0==this.display.length)this.display=
this.build_treenode();else if(this.root){var g=this.build_treenode();this.display.append(g);this.display=g}if(0==this.input.length&&(d=this.build_input(c))&&0<d.length)this.display.append(d),c+=b.colwidth;0==this.span.length&&(this.display.append(this.build_span(c)),c+=b.colwidth);0==this.link.length&&this.display.append(this.build_title(c));0==this.childlist.length&&this.display.append(this.build_children());if(b.onbuild)b.onbuild(this);this.searchItem=this.display.clone();a(".treeselect-expand",
this.searchItem).remove();c=a("div.treeselect-title",this.searchItem);0<c.length&&c.replaceWith(this.nodeLink);b.postbuild&&b.postbuild(this);"undefined"!==typeof this.exclude[this.id]&&0==a(".treenode-input",this.display).length&&this.display.hide();return this.display};d.prototype.getSelectAll=function(){return this.root&&this.selectAll?this.selectAllText:!1};d.prototype.setDefault=function(a,b){jQuery.isEmptyObject(a)?b&&b(this):this.loadAll(function(a){b&&b(a)},function(b){(a.hasOwnProperty(b.value)||
a.hasOwnProperty(b.id))&&b.check(!0)})};d.prototype.search=function(a,e){if(a){var g={};a=a.toLowerCase();b.searcher?b.searcher(this,a,function(a,b){var f=null,k;for(k in a)f=new d(b?b(a[k]):a[k]),f.nodeloaded=!0,c[f.id]=f.id,f.build(),g[k]=f;e(g,!0)}):this.loadAll(function(){e&&e(g,!0)},function(b){!b.root&&-1!==b.title.toLowerCase().search(a)&&(g[b.id]=b)},!0)}else e&&e(this.children,!1)};return a(this).each(function(){var c=a.extend(b,{display:a(this)}),c=this.treenode=new d(c,!0),e=c.getSelectAll();
!1!==e&&!c.showRoot&&(c.display.append(a(document.createElement("input")).attr({type:"checkbox"}).bind("click",function(c){return function(d){c.selectChildren(a(d.target).is(":checked"));b.selected&&b.selected(c,!0)}}(c))),e&&(e=a(document.createElement("span")).attr({"class":"treeselect-select-all"}).html(e),c.display.append(e)));var g=a(document.createElement("span")).addClass("treebusy");c.display.append(g);c.loadNode(function(a){g.remove();0==a.children.length&&a.display.hide();a.checked&&a.select(a.checked);
a.expand(!0);a.setDefault(b.default_value,function(a){b.treeloaded&&b.treeloaded(a)})});c.has_children||(this.parentElement.style.display="none")})}})(jQuery);
(function(a){a.fn.chosentree=function(b){b=a.extend({inputId:"chosentree-select",label:"",description:"",input_placeholder:"Select Item",input_type:"text",autosearch:!1,search_text:"Search",no_results_text:"No results found",min_height:100,more_text:"+%num% more",loaded:null,collapsed:!0,showtree:!1},b);return a(this).each(function(){var c=null,d=null,f=null,e=null,g=null,j=null,h=null,n=null,k=j=null,q=null,t=function(a){a&&(null==q||q.has_children)?k.addClass("treevisible").show("fast"):k.removeClass("treevisible").hide("fast")},
c=a(document.createElement("div"));c.addClass("chzntree-container");"search"==b.input_type?(c.addClass("chzntree-container-single"),f=a(document.createElement("div")),f.addClass("chzntree-search")):(c.addClass("chzntree-container-multi"),d=a(document.createElement("ul")),d.addClass("chzntree-choices chosentree-choices"),f=a(document.createElement("li")),f.addClass("search-field"));j=a(document.createElement("label"));j.attr({"for":b.inputId});j.text(b.label);n=a(document.createElement("div"));n.attr({"class":"description"});
n.text(b.description);if(b.input_placeholder){e=a(document.createElement("input"));e.attr({type:"text",placeholder:b.input_placeholder,autocomplete:"off"});!b.showtree&&b.collapsed&&e.focus(function(){t(!0)});if("search"==b.input_type){e.addClass("chosentree-search");var r=function(a){return!e.hasClass("searching")&&1!==a.length&&q?(e.addClass("searching"),q.search(a,function(a,c){e.removeClass("searching");var d=0;q.childlist.children().detach();c?q.childlist.addClass("chzntree-search-results"):
q.childlist.removeClass("chzntree-search-results");for(var f in a)d++,c?q.childlist.append(a[f].searchItem):q.childlist.append(a[f].display);d||q.childlist.append("<li>"+b.no_results_text+"</li>")}),!0):!1};if(b.autosearch){var s=0;e.bind("input",function u(){r(e.val())||(clearTimeout(s),s=setTimeout(u,1E3))});f.addClass("autosearch")}else g=a(document.createElement("input")),g.attr({type:"button",value:b.search_text}),g.addClass("chosentree-search-btn"),g.bind("click",function(a){a.preventDefault();
r(e.val())}),f.addClass("manualsearch")}else e.addClass("chosentree-results");f.append(e);g&&f.append(g)}d?c.append(j).append(d.append(f)):c.append(j).append(f);k=a(document.createElement("div"));k.addClass("treewrapper");k.hide();h=a(document.createElement("span")).attr({"class":"tree-loading treebusy"}).css("display","block");j=a(document.createElement("div"));j.addClass("treeselect");a(this).keyup(function(a){27==a.which&&t(!1)});k.append(j.append(h));a(this).append(c.append(k));a(this).append(n);
var p=b,m=this;p.selected=function(c,g){var h=a("li#choice_"+c.id,d);if(c.id)if(c.checked&&0==h.length){h=a(document.createElement("li"));h.addClass("search-choice");h.attr("id","choice_"+c.id);h.eq(0)[0].nodeData=c;var j=a(document.createElement("span"));j.text(c.title);if(!c.root||c.showRoot&&c.has_children){var k=a(document.createElement("a"));k.addClass("search-choice-close");k.attr("href","javascript:void(0)");k.bind("click",function(b){b.preventDefault();a("li#choice_"+c.id,d).remove();c.select(!1)})}f.before(h.append(j).append(k))}else c.checked||
h.remove();if(g){var n=[];m.value={};d.show();e&&0==c.children.length&&e.attr({value:""});a("li.search-choice",d).each(function(){m.value[this.nodeData.id]=this.nodeData.value;n.push(this.nodeData)});jQuery.fn.moreorless&&(k=b.more_text.replace("%num%",n.length),d.moreorless(b.min_height,k),d.div_expanded||t(!0,null));p.loaded&&p.loaded(n);a(m).trigger("treeloaded")}};p.treeloaded=function(){h.remove()};j.treeselect(p);q=j.eq(0)[0].treenode;(p.showtree||!p.collapsed)&&t(!0,null)})}})(jQuery);
(function(a){a.fn.group_select=function(b){b=jQuery.extend({uuid:0,depth:8,sortby:"title",sort:"asc",include_group_info:0,include_hidden:0,onRoot:null,is_admin:0,is_member:0},b);var c="asc"===b.sort.toLowerCase()?-1:1;drupal.endpoint=drupal.endpoint||"/api/v1/rest";return a(this).each(function(){var d=function(a){var e={};if(!a)return null;var g=parseInt(a.has_children);e.id=a.uuid||b.uuid;e.value=a.nid;e.title=a.title;e.url=a.url;e.has_children=g;e.data=a;e.sort=e[b.sortby];e.children=[];var g=null,
j;for(j in a.below)a.below.hasOwnProperty(j)&&(g=d(a.below[j]))&&e.children.push(g);0<e.children.length&&e.children.sort(function(a,b){return a.sort<b.sort?c:a.sort>b.sort?-c:0});return e};b.load=function(a,c){(new allplayers.group({id:a.id||b.uuid})).getGroupTree({depth:b.depth,include_group_info:b.include_group_info,include_hidden:b.include_hidden,inclusive:1,is_admin:b.is_admin,is_member:b.is_member},function(a){a=d(a);if(b.onRoot)b.onRoot(a);c(a)})};b.searcher=function(a,c,g){(new allplayers.group({id:a.id||
b.uuid})).find(c,function(a){g(a,d)})};b.inputId="chosentree-select-"+b.uuid;a(this).chosentree(b)})}})(jQuery);
(function(a){a.fn.group_finder=function(b){var c={};b=jQuery.extend({deepLoad:1,inputName:"",input_placeholder:"Find subgroups",input_type:"search",no_results_text:"No groups found",unavailable_text:"Unavailable",load_extra_info:0,include_group_info:1,show_register_link:1,include_hidden:0,show_url_link:1,showRoot:0,showtree:1,onRoot:function(a){c=a},onbuild:function(d){if(b.include_group_info){if(b.show_register_link&&!d.has_register_link){d.has_register_link=!0;if(d.data.roles_enabled){d.root&&(d.data.register_link+=
"/select");var f=d.data.register_link,f=f+"?destination="+encodeURIComponent(window.document.URL),f=f+("&from="+c.id);d.link.after(a(document.createElement("a")).attr({"class":"allplayers-register-link",href:f}).text(d.data.register_text))}if(b.load_extra_info){var e=0;d.loadAll(function(){0<e?d.link.append(a(document.createElement("span")).html(e+" "+(1==e?"subgroup":"subgroups")+" open").attr({"class":"extra-info"})):d.data.roles_enabled||d.link.append(a(document.createElement("span")).html(b.unavailable_text).attr({"class":"extra-info"}))},
function(a){a.id!=d.id&&a.data.register_link&&e++},!0)}}b.show_url_link&&(d.data.url&&!d.has_url_link)&&(d.has_url_link=!0,d.link.after(a(document.createElement("a")).attr({"class":"allplayers-url-link",href:d.data.url}).append(a(document.createElement("span")).attr({"class":"ui-icon ui-icon-circle-arrow-e"}))))}}},b);return a(this).each(function(){a(this).group_select(b)})}})(jQuery);
