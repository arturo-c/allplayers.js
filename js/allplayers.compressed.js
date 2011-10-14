var allplayers=allplayers||{};
(function(b){allplayers.api=function(a){var c={path:"https://www.pdup.allplayers.com/api/v1/rest"};c.group_path=c.path+"/groups.jsonp";a=b.extend(c,a);allplayers.base.call(this,null,a)};allplayers.api.prototype.get=function(a,c){b.getJSON(a,function(a,b){b=="success"?c(a):this.log("Error: "+b)})};allplayers.api.prototype.getGroups=function(a,c){var b=this.options.group_path+"?";b+=a?'search="'+encodeURIComponent(a)+'"&':"";b+="callback=?";this.get(b,c)};allplayers.api.prototype.getGroup=function(a,
c,b){a=this.options.group_path+"/"+a+"?";a+=c?jQuery.param(c)+"&":"";a+="callback=?";this.get(a,b)};allplayers.api.prototype.getGroupAlbums=function(a,c,b){a=this.options.group_path+"/"+a+"/albums?";a+=c?jQuery.param(c)+"&":"";a+="callback=?";this.get(a,b)};allplayers.api.prototype.getGroupEvents=function(a,b,d){a=this.options.group_path+"/"+a+"/events?";a+=b?jQuery.param(b)+"&":"";a+="callback=?";this.get(a,d)};allplayers.api.prototype.getGroupMembers=function(a,b,d){a=this.options.group_path+"/"+
a+"/members?";a+=b?jQuery.param(b)+"&":"";a+="callback=?";this.get(a,d)};allplayers.api.prototype.getGroupPhotos=function(a,b,d){a=this.options.group_path+"/"+a+"/photos?";a+=b?jQuery.param(b)+"&":"";a+="callback=?";this.get(a,d)}})(jQuery);allplayers=allplayers||{};(function(){allplayers.base=function(b,a){this.api=b;this.options=a};allplayers.base.prototype.log=function(b){console.log(b)}})(jQuery);allplayers=allplayers||{};
(function(b){var a={};allplayers.calendars={};if(!b.fn.allplayers_calendar)b.fn.allplayers_calendar=function(a){return b(this).each(function(){allplayers.calendars[b(this).selector]||new allplayers.calendar(b(this),a)})};allplayers.calendar=function(c,d){d=b.extend(a,d,{dayClick:this.onDayClick,eventClick:this.onEventClick,events:this.getEvents});APCI.calendars[d.id]=this;c.fullCalendar(d)};allplayers.calendar.prototype.onDayClick=function(){console.log("Day has been clicked")};allplayers.calendar.prototype.onEventClick=
function(){console.log("Event has been clicked")};allplayers.calendar.prototype.getEvents=function(a,d,f){b.ajax();var e=new Date,a=e.getDate(),d=e.getMonth(),e=e.getFullYear();f([{title:"Test Event",start:new Date(e,d,a-2),end:new Date(e,d,a)}])}})(jQuery);allplayers=allplayers||{};
(function(b){allplayers.entity=function(a,b){this.description=this.title=this.uuid="";allplayers.base.call(this,a,b)};allplayers.entity.prototype=new allplayers.base;allplayers.entity.prototype.constructor=allplayers.entity;allplayers.entity.prototype.update=function(a){b.extend(true,this,a)}})(jQuery);allplayers=allplayers||{};
(function(){allplayers.group=function(b,a,c){this.location=new allplayers.location(b,a);this.list_in_directory=this.activity_level=0;this.active=false;this.secondary_color=this.primary_color=this.accept_amex=this.approved_for_payment=this.registration_fees_enabled="";this.node_status=0;this.url=this.uri=this.logo="";this.groups_above_uuid=[];allplayers.entity.call(this,b,a);this.update(c)};allplayers.group.prototype=new allplayers.entity;allplayers.group.prototype.constructor=allplayers.group;allplayers.group.prototype.save=
function(){this.api.saveGroup(this)}})(jQuery);allplayers=allplayers||{};
(function(){allplayers.groups=function(b,a){allplayers.base.call(this,b,a)};allplayers.groups.prototype=new allplayers.base;allplayers.groups.prototype.constructor=allplayers.groups;allplayers.groups.prototype.getGroups=function(b,a){this.api.getGroups(b,function(b){for(var d=[],f=b.length;f--;)d.push(new allplayers.group(this.options,this.api,b[f]));a(d)})};allplayers.groups.prototype.getGroup=function(b){this.api.getGroup(b,function(a){return new allplayers.group(this.options,this.api,a)})}})(jQuery);
allplayers=allplayers||{};(function(){allplayers.location=function(b,a){this.longitude=this.latitude=this.country=this.zip=this.state=this.city=this.street="";allplayers.entity.call(this,b,a)};allplayers.location.prototype=new allplayers.entity;allplayers.location.prototype.constructor=allplayers.location})(jQuery);
