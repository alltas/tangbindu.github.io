//脚本抽出
$("section script").each(function(i,elem){
  var script=$(this)
  $.get($(this).attr("src"),function(data){
    if(data.length<1) return;
    var title=data.slice(0,data.indexOf("\n")).replace(/\//g,"");
    $('<pre class="prettyprint">'+data+"</pre>").insertBefore(script);
    script.parent().prepend($('<h1>'+title+"</h1>"));
  })
})

setTimeout(function(){
  //目录生产
  var list=$("<ul>");
  var demo_title="<li><a></a></li>";
  $("section").each(function(){
    list.append($(demo_title).find("a").attr("href","#"+$(this).attr("id")).text($(this).find("h1").text()).parent());
  })
  $(".category").append(list)
},5000)