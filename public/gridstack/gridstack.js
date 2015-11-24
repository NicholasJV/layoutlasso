!function(t){"function"==typeof define&&define.amd?define(["jquery","lodash","jquery-ui/core","jquery-ui/widget","jquery-ui/mouse","jquery-ui/draggable","jquery-ui/resizable"],t):t(jQuery,_)}(function(t,e){var i=window,n={is_intercepted:function(t,e){return!(t.x+t.width<=e.x||e.x+e.width<=t.x||t.y+t.height<=e.y||e.y+e.height<=t.y)},sort:function(t,i,n){return n=n||e.chain(t).map(function(t){return t.x+t.width}).max().value(),i=-1!=i?1:-1,e.sortBy(t,function(t){return i*(t.x+t.y*n)})},create_stylesheet:function(t){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.setAttribute("data-gs-id",t),e.styleSheet?e.styleSheet.cssText="":e.appendChild(document.createTextNode("")),document.getElementsByTagName("head")[0].appendChild(e),e.sheet},remove_stylesheet:function(e){t("STYLE[data-gs-id="+e+"]").remove()},insert_css_rule:function(t,e,i,n){"function"==typeof t.insertRule?t.insertRule(e+"{"+i+"}",n):"function"==typeof t.addRule&&t.addRule(e,i,n)},toBool:function(t){return"boolean"==typeof t?t:"string"==typeof t?(t=t.toLowerCase(),!(""==t||"no"==t||"false"==t||"0"==t)):Boolean(t)}},s=0,o=function(t,e,i,n,s){this.width=t,this["float"]=i||!1,this.height=n||0,this.nodes=s||[],this.onchange=e||function(){},this._update_counter=0,this._float=this["float"]};o.prototype.batch_update=function(){this._update_counter=1,this["float"]=!0},o.prototype.commit=function(){this._update_counter=0,0==this._update_counter&&(this["float"]=this._float,this._pack_nodes(),this._notify())},o.prototype._fix_collisions=function(t){this._sort_nodes(-1);var i=t,s=Boolean(e.find(this.nodes,function(t){return t.locked}));for(this["float"]||s||(i={x:0,y:t.y,width:this.width,height:t.height});;){var o=e.find(this.nodes,function(e){return e!=t&&n.is_intercepted(e,i)},this);if("undefined"==typeof o)return;this.move_node(o,o.x,t.y+t.height,o.width,o.height,!0)}},o.prototype.is_area_empty=function(t,i,s,o){var a={x:t||0,y:i||0,width:s||1,height:o||1},h=e.find(this.nodes,function(t){return n.is_intercepted(t,a)},this);return null==h},o.prototype._sort_nodes=function(t){this.nodes=n.sort(this.nodes,t,this.width)},o.prototype._pack_nodes=function(){this._sort_nodes(),this["float"]?e.each(this.nodes,function(t,i){if(!t._updating&&"undefined"!=typeof t._orig_y&&t.y!=t._orig_y)for(var s=t.y;s>=t._orig_y;){var o=e.chain(this.nodes).find(function(e){return t!=e&&n.is_intercepted({x:t.x,y:s,width:t.width,height:t.height},e)}).value();o||(t._dirty=!0,t.y=s),--s}},this):e.each(this.nodes,function(t,i){if(!t.locked)for(;t.y>0;){var s=t.y-1,o=0==i;if(i>0){var a=e.chain(this.nodes).take(i).find(function(e){return n.is_intercepted({x:t.x,y:s,width:t.width,height:t.height},e)}).value();o="undefined"==typeof a}if(!o)break;t._dirty=t.y!=s,t.y=s}},this)},o.prototype._prepare_node=function(t,i){return t=e.defaults(t||{},{width:1,height:1,x:0,y:0}),t.x=parseInt(""+t.x),t.y=parseInt(""+t.y),t.width=parseInt(""+t.width),t.height=parseInt(""+t.height),t.auto_position=t.auto_position||!1,t.no_resize=t.no_resize||!1,t.no_move=t.no_move||!1,t.width>this.width?t.width=this.width:t.width<1&&(t.width=1),t.height<1&&(t.height=1),t.x<0&&(t.x=0),t.x+t.width>this.width&&(i?t.width=this.width-t.x:t.x=this.width-t.width),t.y<0&&(t.y=0),t},o.prototype._notify=function(){if(!this._update_counter){var t=Array.prototype.slice.call(arguments,1).concat(this.get_dirty_nodes());t=t.concat(this.get_dirty_nodes()),this.onchange(t)}},o.prototype.clean_nodes=function(){e.each(this.nodes,function(t){t._dirty=!1})},o.prototype.get_dirty_nodes=function(){return e.filter(this.nodes,function(t){return t._dirty})},o.prototype.add_node=function(t){if(t=this._prepare_node(t),"undefined"!=typeof t.max_width&&(t.width=Math.min(t.width,t.max_width)),"undefined"!=typeof t.max_height&&(t.height=Math.min(t.height,t.max_height)),"undefined"!=typeof t.min_width&&(t.width=Math.max(t.width,t.min_width)),"undefined"!=typeof t.min_height&&(t.height=Math.max(t.height,t.min_height)),t._id=++s,t._dirty=!0,t.auto_position){this._sort_nodes();for(var i=0;;++i){var o=i%this.width,a=Math.floor(i/this.width);if(!(o+t.width>this.width||e.find(this.nodes,function(e){return n.is_intercepted({x:o,y:a,width:t.width,height:t.height},e)}))){t.x=o,t.y=a;break}}}return this.nodes.push(t),this._fix_collisions(t),this._pack_nodes(),this._notify(),t},o.prototype.remove_node=function(t){t._id=null,this.nodes=e.without(this.nodes,t),this._pack_nodes(),this._notify(t)},o.prototype.can_move_node=function(i,n,s,a,h){var r=Boolean(e.find(this.nodes,function(t){return t.locked}));if(!this.height&&!r)return!0;var d,_=new o(this.width,null,this["float"],0,e.map(this.nodes,function(e){return e==i?d=t.extend({},e):t.extend({},e)}));_.move_node(d,n,s,a,h);var l=!0;return r&&(l&=!Boolean(e.find(_.nodes,function(t){return t!=d&&Boolean(t.locked)&&Boolean(t._dirty)}))),this.height&&(l&=_.get_grid_height()<=this.height),l},o.prototype.can_be_placed_with_respect_to_height=function(i){if(!this.height)return!0;var n=new o(this.width,null,this["float"],0,e.map(this.nodes,function(e){return t.extend({},e)}));return n.add_node(i),n.get_grid_height()<=this.height},o.prototype.move_node=function(t,e,i,n,s,o){if("number"!=typeof e&&(e=t.x),"number"!=typeof i&&(i=t.y),"number"!=typeof n&&(n=t.width),"number"!=typeof s&&(s=t.height),"undefined"!=typeof t.max_width&&(n=Math.min(n,t.max_width)),"undefined"!=typeof t.max_height&&(s=Math.min(s,t.max_height)),"undefined"!=typeof t.min_width&&(n=Math.max(n,t.min_width)),"undefined"!=typeof t.min_height&&(s=Math.max(s,t.min_height)),t.x==e&&t.y==i&&t.width==n&&t.height==s)return t;var a=t.width!=n;return t._dirty=!0,t.x=e,t.y=i,t.width=n,t.height=s,t=this._prepare_node(t,a),this._fix_collisions(t),o||(this._pack_nodes(),this._notify()),t},o.prototype.get_grid_height=function(){return e.reduce(this.nodes,function(t,e){return Math.max(t,e.y+e.height)},0)},o.prototype.begin_update=function(t){e.each(this.nodes,function(t){t._orig_y=t.y}),t._updating=!0},o.prototype.end_update=function(){e.each(this.nodes,function(t){t._orig_y=t.y});var t=e.find(this.nodes,function(t){return t._updating});t&&(t._updating=!1)};var a=function(i,n){var s,a=this;n=n||{},this.container=t(i),n.item_class=n.item_class||"grid-stack-item";var h=this.container.closest("."+n.item_class).size()>0;if(this.opts=e.defaults(n||{},{width:parseInt(this.container.attr("data-gs-width"))||12,height:parseInt(this.container.attr("data-gs-height"))||0,item_class:"grid-stack-item",placeholder_class:"grid-stack-placeholder",handle:".grid-stack-item-content",handle_class:null,cell_height:60,vertical_margin:20,auto:!0,min_width:768,"float":!1,static_grid:!1,_class:"grid-stack-"+(1e4*Math.random()).toFixed(0),animate:Boolean(this.container.attr("data-gs-animate"))||!1,always_show_resize_handle:n.always_show_resize_handle||!1,resizable:e.defaults(n.resizable||{},{autoHide:!n.always_show_resize_handle,handles:"se"}),draggable:e.defaults(n.draggable||{},{handle:(n.handle_class?"."+n.handle_class:n.handle?n.handle:"")||".grid-stack-item-content",scroll:!1,appendTo:"body"})}),this.opts.is_nested=h,this.container.addClass(this.opts._class),this._set_static_class(),h&&this.container.addClass("grid-stack-nested"),this._init_styles(),this.grid=new o(this.opts.width,function(t){var i=0;e.each(t,function(t){null==t._id?t.el.remove():(t.el.attr("data-gs-x",t.x).attr("data-gs-y",t.y).attr("data-gs-width",t.width).attr("data-gs-height",t.height),i=Math.max(i,t.y+t.height))}),a._update_styles(i+10)},this.opts["float"],this.opts.height),this.opts.auto){var r=[],d=this;this.container.children("."+this.opts.item_class+":not(."+this.opts.placeholder_class+")").each(function(e,i){i=t(i),r.push({el:i,i:parseInt(i.attr("data-gs-x"))+parseInt(i.attr("data-gs-y"))*d.opts.width})}),e.chain(r).sortBy(function(t){return t.i}).each(function(t){a._prepare_element(t.el)}).value()}this.set_animation(this.opts.animate),this.placeholder=t('<div class="'+this.opts.placeholder_class+" "+this.opts.item_class+'"><div class="placeholder-content" /></div>').hide(),this.container.height(this.grid.get_grid_height()*(this.opts.cell_height+this.opts.vertical_margin)-this.opts.vertical_margin),this.on_resize_handler=function(){if(a._is_one_column_mode()){if(s)return;s=!0,a.grid._sort_nodes(),e.each(a.grid.nodes,function(t){a.container.append(t.el),a.opts.static_grid||(t.no_move||t.el.draggable("disable"),t.no_resize||t.el.resizable("disable"))})}else{if(!s)return;if(s=!1,a.opts.static_grid)return;e.each(a.grid.nodes,function(t){t.no_move||t.el.draggable("enable"),t.no_resize||t.el.resizable("enable")})}},t(window).resize(this.on_resize_handler),this.on_resize_handler()};return a.prototype._trigger_change_event=function(t){var e=this.grid.get_dirty_nodes(),i=!1,n=[];e&&e.length&&(n.push(e),i=!0),(i||t===!0)&&this.container.trigger("change",n)},a.prototype._init_styles=function(){this._styles_id&&t('[data-gs-id="'+this._styles_id+'"]').remove(),this._styles_id="gridstack-style-"+(1e5*Math.random()).toFixed(),this._styles=n.create_stylesheet(this._styles_id),null!=this._styles&&(this._styles._max=0)},a.prototype._update_styles=function(t){if(null!=this._styles){var e="."+this.opts._class+" ."+this.opts.item_class;if("undefined"==typeof t&&(t=this._styles._max,this._init_styles(),this._update_container_height()),0==this._styles._max&&n.insert_css_rule(this._styles,e,"min-height: "+this.opts.cell_height+"px;",0),t>this._styles._max){for(var i=this._styles._max;t>i;++i)n.insert_css_rule(this._styles,e+'[data-gs-height="'+(i+1)+'"]',"height: "+(this.opts.cell_height*(i+1)+this.opts.vertical_margin*i)+"px;",i),n.insert_css_rule(this._styles,e+'[data-gs-min-height="'+(i+1)+'"]',"min-height: "+(this.opts.cell_height*(i+1)+this.opts.vertical_margin*i)+"px;",i),n.insert_css_rule(this._styles,e+'[data-gs-max-height="'+(i+1)+'"]',"max-height: "+(this.opts.cell_height*(i+1)+this.opts.vertical_margin*i)+"px;",i),n.insert_css_rule(this._styles,e+'[data-gs-y="'+i+'"]',"top: "+(this.opts.cell_height*i+this.opts.vertical_margin*i)+"px;",i);this._styles._max=t}}},a.prototype._update_container_height=function(){this.grid._update_counter||this.container.height(this.grid.get_grid_height()*(this.opts.cell_height+this.opts.vertical_margin)-this.opts.vertical_margin)},a.prototype._is_one_column_mode=function(){return(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)<=this.opts.min_width},a.prototype._prepare_element=function(i){var s=this;i=t(i),i.addClass(this.opts.item_class);var o=s.grid.add_node({x:i.attr("data-gs-x"),y:i.attr("data-gs-y"),width:i.attr("data-gs-width"),height:i.attr("data-gs-height"),max_width:i.attr("data-gs-max-width"),min_width:i.attr("data-gs-min-width"),max_height:i.attr("data-gs-max-height"),min_height:i.attr("data-gs-min-height"),auto_position:n.toBool(i.attr("data-gs-auto-position")),no_resize:n.toBool(i.attr("data-gs-no-resize")),no_move:n.toBool(i.attr("data-gs-no-move")),locked:n.toBool(i.attr("data-gs-locked")),el:i});if(i.data("_gridstack_node",o),!s.opts.static_grid){var a,h,r=function(e,n){s.container.append(s.placeholder);var r=t(this);s.grid.clean_nodes(),s.grid.begin_update(o),a=Math.ceil(r.outerWidth()/r.attr("data-gs-width")),h=s.opts.cell_height+s.opts.vertical_margin,s.placeholder.attr("data-gs-x",r.attr("data-gs-x")).attr("data-gs-y",r.attr("data-gs-y")).attr("data-gs-width",r.attr("data-gs-width")).attr("data-gs-height",r.attr("data-gs-height")).show(),o.el=s.placeholder,i.resizable("option","minWidth",a*(o.min_width||1)),i.resizable("option","minHeight",s.opts.cell_height*(o.min_height||1))},d=function(e,i){s.placeholder.detach();var n=t(this);o.el=n,s.placeholder.hide(),n.attr("data-gs-x",o.x).attr("data-gs-y",o.y).attr("data-gs-width",o.width).attr("data-gs-height",o.height).removeAttr("style"),s._update_container_height(),s._trigger_change_event(),s.grid.end_update()};i.draggable(e.extend(this.opts.draggable,{start:r,stop:d,drag:function(t,e){var i=Math.round(e.position.left/a),n=Math.floor((e.position.top+h/2)/h);s.grid.can_move_node(o,i,n,o.width,o.height)&&(s.grid.move_node(o,i,n),s._update_container_height())},containment:this.opts.is_nested?this.container.parent():null})).resizable(e.extend(this.opts.resizable,{start:r,stop:d,resize:function(t,e){var i=Math.round(e.position.left/a),n=Math.floor((e.position.top+h/2)/h),r=Math.round(e.size.width/a),d=Math.round(e.size.height/h);s.grid.can_move_node(o,i,n,r,d)&&(s.grid.move_node(o,i,n,r,d),s._update_container_height())}})),(o.no_move||this._is_one_column_mode())&&i.draggable("disable"),(o.no_resize||this._is_one_column_mode())&&i.resizable("disable"),i.attr("data-gs-locked",o.locked?"yes":null)}},a.prototype.set_animation=function(t){t?this.container.addClass("grid-stack-animate"):this.container.removeClass("grid-stack-animate")},a.prototype.add_widget=function(e,i,n,s,o,a){return e=t(e),"undefined"!=typeof i&&e.attr("data-gs-x",i),"undefined"!=typeof n&&e.attr("data-gs-y",n),"undefined"!=typeof s&&e.attr("data-gs-width",s),"undefined"!=typeof o&&e.attr("data-gs-height",o),"undefined"!=typeof a&&e.attr("data-gs-auto-position",a?"yes":null),this.container.append(e),this._prepare_element(e),this._update_container_height(),this._trigger_change_event(!0),e},a.prototype.will_it_fit=function(t,e,i,n,s){var o={x:t,y:e,width:i,height:n,auto_position:s};return this.grid.can_be_placed_with_respect_to_height(o)},a.prototype.remove_widget=function(e,i){i="undefined"==typeof i?!0:i,e=t(e);var n=e.data("_gridstack_node");this.grid.remove_node(n),e.removeData("_gridstack_node"),this._update_container_height(),i&&e.remove(),this._trigger_change_event(!0)},a.prototype.remove_all=function(t){e.each(this.grid.nodes,function(e){this.remove_widget(e.el,t)},this),this.grid.nodes=[],this._update_container_height()},a.prototype.destroy=function(){t(window).off("resize",this.on_resize_handler),this.disable(),this.container.remove(),n.remove_stylesheet(this._styles_id),this.grid&&(this.grid=null)},a.prototype.resizable=function(e,i){return e=t(e),e.each(function(e,n){n=t(n);var s=n.data("_gridstack_node");"undefined"!=typeof s&&null!=s&&(s.no_resize=!i,s.no_resize?n.resizable("disable"):n.resizable("enable"))}),this},a.prototype.movable=function(e,i){return e=t(e),e.each(function(e,n){n=t(n);var s=n.data("_gridstack_node");"undefined"!=typeof s&&null!=s&&(s.no_move=!i,s.no_move?n.draggable("disable"):n.draggable("enable"))}),this},a.prototype.disable=function(){this.movable(this.container.children("."+this.opts.item_class),!1),this.resizable(this.container.children("."+this.opts.item_class),!1)},a.prototype.enable=function(){this.movable(this.container.children("."+this.opts.item_class),!0),this.resizable(this.container.children("."+this.opts.item_class),!0)},a.prototype.locked=function(e,i){return e=t(e),e.each(function(e,n){n=t(n);var s=n.data("_gridstack_node");"undefined"!=typeof s&&null!=s&&(s.locked=i||!1,n.attr("data-gs-locked",s.locked?"yes":null))}),this},a.prototype.min_height=function(e,i){return e=t(e),e.each(function(e,n){n=t(n);var s=n.data("_gridstack_node");"undefined"!=typeof s&&null!=s&&(isNaN(i)||(s.min_height=i||!1,n.attr("data-gs-min-height",i)))}),this},a.prototype.min_width=function(e,i){return e=t(e),e.each(function(e,n){n=t(n);var s=n.data("_gridstack_node");"undefined"!=typeof s&&null!=s&&(isNaN(i)||(s.min_width=i||!1,n.attr("data-gs-min-width",i)))}),this},a.prototype._update_element=function(e,i){e=t(e).first();var n=e.data("_gridstack_node");if("undefined"!=typeof n&&null!=n){var s=this;s.grid.clean_nodes(),s.grid.begin_update(n),i.call(this,e,n),s._update_container_height(),s._trigger_change_event(),s.grid.end_update()}},a.prototype.resize=function(t,e,i){this._update_element(t,function(t,n){e=null!=e&&"undefined"!=typeof e?e:n.width,i=null!=i&&"undefined"!=typeof i?i:n.height,this.grid.move_node(n,n.x,n.y,e,i)})},a.prototype.move=function(t,e,i){this._update_element(t,function(t,n){e=null!=e&&"undefined"!=typeof e?e:n.x,i=null!=i&&"undefined"!=typeof i?i:n.y,this.grid.move_node(n,e,i,n.width,n.height)})},a.prototype.update=function(t,e,i,n,s){this._update_element(t,function(t,o){e=null!=e&&"undefined"!=typeof e?e:o.x,i=null!=i&&"undefined"!=typeof i?i:o.y,n=null!=n&&"undefined"!=typeof n?n:o.width,s=null!=s&&"undefined"!=typeof s?s:o.height,this.grid.move_node(o,e,i,n,s)})},a.prototype.cell_height=function(t){return"undefined"==typeof t?this.opts.cell_height:(t=parseInt(t),void(t!=this.opts.cell_height&&(this.opts.cell_height=t||this.opts.cell_height,this._update_styles())))},a.prototype.cell_width=function(){var t=this.container.children("."+this.opts.item_class).first();return Math.ceil(t.outerWidth()/t.attr("data-gs-width"))},a.prototype.get_cell_from_pixel=function(t){var e=this.container.position(),i=t.left-e.left,n=t.top-e.top,s=Math.floor(this.container.width()/this.opts.width),o=this.opts.cell_height+this.opts.vertical_margin;return{x:Math.floor(i/s),y:Math.floor(n/o)}},a.prototype.batch_update=function(){this.grid.batch_update()},a.prototype.commit=function(){this.grid.commit(),this._update_container_height()},a.prototype.is_area_empty=function(t,e,i,n){return this.grid.is_area_empty(t,e,i,n)},a.prototype.set_static=function(t){this.opts.static_grid=t===!0,this._set_static_class()},a.prototype._set_static_class=function(){var t="grid-stack-static";this.opts.static_grid===!0?this.container.addClass(t):this.container.removeClass(t)},i.GridStackUI=a,i.GridStackUI.Utils=n,t.fn.gridstack=function(e){return this.each(function(){t(this).data("gridstack")||t(this).data("gridstack",new a(this,e))})},i.GridStackUI});
//# sourceMappingURL=gridstack.min.map