//脚本抽出
$("section script").each(function(i,elem){
  var script=$(this)
  $.get($(this).attr("src"),function(data){
    if(data.length<1) return;
    $('<pre class="prettyprint">'+data+"</pre>").insertBefore(script);
  })
})


//目录生产
var list=$("<ul>");
var demo_title="<li><a></a></li>";
$("section").each(function(){
  list.append($(demo_title).find("a").attr("href","#"+$(this).attr("id")).text($(this).find("h1").text()).parent());
})
$(".category").append(list)