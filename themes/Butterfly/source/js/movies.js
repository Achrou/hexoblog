// $.ajax({
// 	url: "https://images.jsonpop.cn/items.json",//json文件位置，文件名
// 	type: "GET",
// 	dataType: "json",
// 	success: function(data) {
// 		for(var i = 0;i<data.length;i++){
// 			console.log(data[i].title)
// 			$("#hexo-douban-tab1").text("在看（"+data.length+"）")
// 		}
// 	}
// })
window.onload = function () {
	document.getElementById("blockquote_momik").innerText = "人的生命有限。倘若你能专注地看一本书，一部电影，你就因此经历了另外一个人生。"
	var url = "https://images.jsonpop.cn/items.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
	var request = new XMLHttpRequest();
	request.open("get", url);/*设置请求方法与路径*/
	request.send(null);/*不发送数据到服务器*/
	request.onload = function () {/*XHR对象获取到返回信息后执行*/
	    if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
	        var data = JSON.parse(request.responseText);
	        document.getElementById("hexo-douban-tab1").innerText = "在看（"+data.length+"）"
	        document.getElementById("hexo-douban-tab2").innerText = "想看（"+data.length+"）"
	        document.getElementById("hexo-douban-tab3").innerText = "已看（"+data.length+"）"
	        var html = "";
	        for(var i = 0;i<data.length;i++){
				html +='<div class="hexo-douban-item">'
				html +='<div class="hexo-douban-picture">'
				html +='<img src="'+data[i].pic+'" referrerpolicy="no-referrer">'
				html +='</img>'
				html +='</div>'

				html +='<div class="hexo-douban-info">'
				html +='<div class="hexo-douban-title">'
				html +='<a target="_blank" href="'+data[i].href+'">'
				html += data[i].title
				html +='</a>'
				html +='</div>'
				html +='<div class="hexo-douban-meta">'
				html += data[i].intro
				html +='</div>'
				html +='</div>'
				html +='</div>'
			}
			var itemElement = document.getElementsByClassName("hexo-douban-item3")[0];
			itemElement.innerHTML = html
	    }
	}
}

/**


.hexo-douban-item
          .hexo-douban-picture
            img.lazyload(data-src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577437186.jpg" onerror=`this.onerror=null;this.src='` + url_for(theme.lodding_bg.flink) + `'` alt="test-alt" referrerPolicy="no-referrer")
          .hexo-douban-info
            .hexo-douban-title
              a(target="_blank" href="")= "标题"
            .hexo-douban-meta= "信息"


            **/