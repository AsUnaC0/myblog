export const wallPaperData = [
	{
		bigtitle: '整体架构',
		content: '我自己已经上传到微信小程序上面，可以先行体验一下',
		image: require("@/assets/blogImages/wallpaper/wallpaper.jpg"),
	},
	{
		content: '目录结构',
		image: require("@/assets/blogImages/wallpaper/wallpaper1.jpg"),
	},
	{
		bigtitle: '一、请求封装',
		content: '对uni.request方法进行封装',
		code: `export function request(config={}){
  let {url,data}=config
  return new Promise((resolve,reject)=>{
      uni.request({
          url,
          data,
          header:{
              "access-key":613427
          },
          success:res=>{
              if(res.data.errCode===0){
                  resolve(res.data)
              }else if(res.data.errCode===400){
                  uni.showModal({
                      title:"错误提示",
                      content:res.data.errMsg,
                      showCancel:false
                  })
                  reject(res.data)
              }else{
                  uni.showToast({
                      title:res.data.errMsg,
                      icon:"none"
                  })
                  reject(res.data)
              }
          },
          fail:err=>{
              reject(err)
          }
      })
  })
}`
	},
	{
		content: '接口列表总览',
		image: require("@/assets/blogImages/wallpaper/api.jpg"),
	}
	, {
		bigtitle: '二、首页',
		content: '首页由顶层的custom-nav-bar组件，banner轮播图区域，notice公告区域，每日推荐区域，theme-item分类列表组件构成',
		image: require("@/assets/blogImages/wallpaper/main.jpg"),
	},
	{
		smalltitle: '1. custom-nav-bar组件',
		content: '在pages.json设置自定义导航栏,在utils里面定义了获取UniApp 中的系统导航栏高度信息',
		code: `//utils/system.js
const SYSTEM_INFO = uni.getSystemInfoSync()
export const getStatusBarHeight =()=> SYSTEM_INFO.statusBarHeight||15;

export const getTitleBarHeight=()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height} =uni.getMenuButtonBoundingClientRect()
		return height+(top-getStatusBarHeight())*2
	}else{
		return 40
	}
}

export const getNavBarHeight=()=>getStatusBarHeight()+getTitleBarHeight()`
	},
	{
		content: '用空白标签占位实现搜索框与微信右侧默认的胶囊按钮对齐',
		code: `<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{ height:getStatusBarHeight() + 'px'}"></view>
			<view class="titleBar" :style="{height:getTitleBarHeight()+'px'}">
				<view class="title">{{title}}</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>	
		
		<view class="fill" :style="{height:getNavBarHeight()+'px'}">
			
		</view>
	</view>
</template>`
	},
	{
		content: '传递进来的title是用来动态设置标题的，区分是首页还是分类页的搜索框',
		code: `defineProps({
	title:{
		type:String,
		default:"推荐"
	}
})`
	},
	{
		smalltitle: '2. banner轮播图和notice公告区域',
		content: '两种都是轮播图使用了swiper，只不过一种是水平的，一种设置了vertical垂直滑动'
	},
	{
		content: 'banner轮播图设置了target和app-id属性，可以跳转到其他小程序',
		image: require("@/assets/blogImages/wallpaper/swiper.jpg")
	},
	{
		content: 'notice轮播图点击就进入一个公告详情页，传递一下当前的公告id',
	},
	{
		smalltitle: '3. 每日推荐和专题精选的标题组件封装',
		content: '使用了具名插槽，右边可以自定义',
		image: require("@/assets/blogImages/wallpaper/title.jpg"),
		code: `<template>
	<view class="common-title">
		<view class="name">
			<slot name="name"></slot>
		</view>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>`
	},
	{
		smalltitle: '4. theme-item分类列表组件封装',
		content: '用于在首页下方渲染和分类页渲染',
		image: require("@/assets/blogImages/wallpaper/themeitem.jpg")
	},
	{
		content: '首页通过父传子isMore来渲染"更多"这个的分类项，点击更多或者标题的More+都是跳转到分类页',
		code: `<view class="content">
    <theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
    <theme-item :isMore="true"></theme-item>
</view>`
	},
	{
		content: 'theme-item组件内部',
		code: `<template>
	<view class="themeItem">
		<navigator :url="'/pages/classlist/classlist?id='+item._id+'&name='+item.name" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{item.name}}</view>
			<view class="tab" v-if="formatRelativeTime(item.updateTime)">{{formatRelativeTime(item.updateTime)}}前更新</view>
		</navigator>
		
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-else>
			<image class="pic" src="/common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>`
	},
	{
		content: 'formatRelativeTime函数是格式化时间的函数，用于计算时间差，封装在utils文件中',
		image: require("@/assets/blogImages/wallpaper/utils.jpg"),
	},
	{
		bigtitle: '三、分类页',
		content: '分类页就由custom-nav-bar和theme-item组件构成',
	},
	{
		content: '可以分享当前页面(首页也可以)',
		image: require("@/assets/blogImages/wallpaper/share.jpg"),
		code: `// 分享给好友
onShareAppMessage((e)=>{
	return{
		title:"淡大虾壁纸,精选分类",
		path:"/pages/classify/classify"
	}
})

// 分享朋友圈
onShareTimeline(()=>{
	return{
		title:"淡大虾壁纸，精选分类",
	}
})`
	},
	{
		bigtitle: '四、分类列表',
		content: '点击分类项进入相应的分类列表,传递分类id和分类名,通过id获取分类列表，默认获取前12个，修改导航标题为传进来的分类名',
		image: require("@/assets/blogImages/wallpaper/classlist.jpg"),
	},
	{
		content: '也有触底加载更多，使用的是生命周期函数onReachBottom',
		code: `// 定义data参数
const queryParams={
	pageNum:1,
	pageSize:12
}
onReachBottom(()=>{
	if(noData.value) return
	queryParams.pageNum++
	getClassList()
})

// 获取分类列表
const getClassList=async()=>{
	let res
	if(queryParams.classid)res=await apiGetClassList(queryParams)
	if(queryParams.type)res=await apiGetHistoryList(queryParams)
	
	classList.value=[...classList.value,...res.data]
	if(queryParams.pageSize>res.data.length) noData.value=true
	uni.setStorageSync("storageClassList",classList.value)
}`
	},
	{
		content: '使用uni.setStorageSync("storageClassList",classList.value)来保存到本地是方便用户点击进入预览页时候的渲染'
	},
	{
		content: '还使用了uni-load-more标签来渲染是加载中还是加载完毕，提升用户体验',
		code: `<view class="loadingLayout" v-if="classList.length||noData">
	<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
</view>`
	},
	{
		bigtitle: '五、预览页',
		content: '点击分类列表某张图片进入预览页',
		image: require("@/assets/blogImages/wallpaper/click.jpg"),
	},
	{
		smalltitle: '1. 初始渲染',
		content: '进入预览页会传入当前点击的图片的id',
		code: `<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in classList" :key="item._id">
	<image :src="item.smallPicurl" mode="aspectFill"></image>
</navigator>`
	},
	{
		content: '预览页会读取之前的本地存储，渲染出图片数量，根据id渲染对应图片以及该图片处于的索引位置',
		code: `const storageClassList = uni.getStorageSync("storageClassList") || []
classList.value = storageClassList.map(item => {
	return {
		...item,
		picurl: item.smallPicurl.replace("_small.webp", ".jpg")
	}
})
onLoad(async(e) => {
	currentId.value = e.id
	
	if(e.type=='share'){
		let res=await apiDetailWall({
			id:currentId.value
		})
		classList.value=res.data.map(item=>{
			return{
				...item,
				picurl: item.smallPicurl.replace("_small.webp", ".jpg")
			}
		})
	}
	
	currentIndex.value = classList.value.findIndex(item => {
		return item._id == currentId.value
	})
	currentInfo.value = classList.value[currentIndex.value]
	readImgsFun()
})`
	},
	{
		content: 'readImgsFun方法是为了让前一张和后一张图片在滑动图片的时候也能渲染出来，避免空白样式，提升用户体验',
		code: `<template>
	<swiper-item v-for="(item,index) in classList" :key="item._id">
			<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
	</swiper-item>
    ...省略
</template>        

<script setup>
function readImgsFun() {
	readImgs.value.push(
		currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
		currentIndex.value,
		currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
	)
	readImgs.value = [...new Set(readImgs.value)]
}
    ...省略
</script>`
	},
	{
		content: '最后就是蒙版的渲染，像返回按钮、时间、图片索引，下方的操作栏。点击图片控制蒙版的显隐',
		code: `<view class="mask" v-if="maskState">
	<view class="goBack" @click="goBack" :style="{top:getStatusBarHeight()+'px'}">
		<uni-icons type="back" color="#fff" size="20"></uni-icons>
	</view>
	<view class="count">{{currentIndex+1}}/{{classList.length}}</view>
	<view class="time">
		<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
	</view>
	<view class="date">
		<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
	</view>
	<view class="footer">
		<view class="box" @click="clickInfo">
			<uni-icons type="info" size="28"></uni-icons>
			<view class="text">信息</view>
		</view>
		<view class="box" @click="clickScore">
			<uni-icons type="star" size="28"></uni-icons>
			<view class="text">{{currentInfo.score}}分</view>
		</view>
		<view class="box" @click="clickDownload">
			<uni-icons type="download" size="28"></uni-icons>
			<view class="text">下载</view>
		</view>
	</view>
</view>`
	},
	{
		smalltitle: '2. 信息弹出层',
		content: '信息弹出层是通过currentIndex的值来判断当前是第几张图片，然后渲染出对应的信息',
		code: `const swiperChange = (e) => {
    currentIndex.value = e.detail.current
    currentInfo.value = classList.value[currentIndex.value]
    readImgsFun()
}`
	},
	{
		smalltitle: '3. 评分弹出层',
		content: '通过currentInfo里面有没有用户的评分数据，来控制评分弹出层样式以及确认评分按钮的禁用',
		image: require("@/assets/blogImages/wallpaper/score.jpg"),
	},
	{
		code: `	// 评分弹窗
const clickScore = () => {
	if (currentInfo.value.userScore) {
		isScore.value = true
		value.value = currentInfo.value.userScore
	}
	scorePopup.value.open()
}
// 关闭评分弹窗
const clickScoreClose = () => {
	scorePopup.value.close()
	value.value = 0
	isScore.value = false
}`
	},
	{
		content: '评分操作也就是调用API，更新一下本地存储的数据，然后关闭弹窗',
		code: `const submitScore = async () => {
	uni.showLoading({
		title: "加载中..."
	})
	let {
		classid,
		_id: wallId
	} = currentInfo.value
	let res = await apiGetSetupScore({
		classid,
		wallId,
		userScore: value.value
	})
	uni.hideLoading()
	if (res.errCode === 0) {
		uni.showToast({
			title: "评分成功",
			icon: "none"
		})
		classList.value[currentIndex.value].userScore = value.value
		uni.setStorageSync("storgClassList", classList.value)
		clickScoreClose()
	}
}`
	},
	{
		smalltitle: '4. 下载功能',
		content: '下载调用微信API，下载完成后提示下载成功',
		code: `	// 点击下载
const clickDownload = async () => {
	// #ifdef H5
	uni.showModal({
		content: "请长按保存壁纸",
		showCancel: false
	})
	// #endif
	// #ifndef H5
	try {
		uni.showLoading({
			title: "下载中...",
			mask: true
		})
		let {
			classid,
			_id: wallId
		} = currentInfo.value
		let res = await apiWriteDownload({
			classid,
			wallId
		})
		if (res.errCode != 0) throw res
		uni.getImageInfo({
			src: currentInfo.value.picurl,
			success: (res) => {
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: (res) => {
						uni.showToast({
							title:"保存成功",
							icon:"none"
						})
					},
					fail: err => {
						if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
							uni.showToast({
								title: "保存失败",
								icon: "none"
							})
							return
						}
						uni.showModal({
							title: "提示",
							content: "需要授权保存相册",
							success: res => {
								if (res.confirm) {
									uni.openSetting({
										success: (setting) => {
											if (setting
												.authSetting[
													'scope.writephotosAlbum'
													]) {
												uni.showToast({
													title: "获取授权成功",
													icon: "none"
												})
											} else {
												uni.showToast({
													title: "获取授权失败",
													icon: "none"
												})
											}
										}
									})
								}
							}
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			}
		})
	} catch (err) {
		uni.hideLoading()
	}
	// #endif
}`
	},
	{
		bigtitle: '六、个人中心',
		content: '根据IP地址区分用户，拿到当前IP地址用户信息，然后渲染到个人中心页面',
		image: require("@/assets/blogImages/wallpaper/ip.jpg"),
	},
	{
		content: '调用API获取当前IP地址用户的壁纸点赞下载等数据',
		image: require("@/assets/blogImages/wallpaper/download.jpg"),
	},
	{
		bigtitle: '七、搜索页',
		content: '搜索页的实现，根据搜索关键字来获取数据，然后渲染到搜索页',
		image: require("@/assets/blogImages/wallpaper/search2.jpg"),
	},
	{
		content: '将搜索到的数据存在classList里面，然后渲染到搜索页',
		code: `const searchData=async()=>{
	try{
		let res=await apiSearchData(queryParams.value)
		classList.value=[...classList.value,...res.data]
		uni.setStorageSync("storageClassList",classList.value)
		if(queryParams.value.pageSize>res.data.length) noData.value=true
		if(res.data.length==0&&classList.value.length==0)noSearch.value=true
	}finally{
		uni.hideLoading()
	}
}`
	},
	{
		content: '没有搜索数据或者没有在搜索的时候就显示最近搜索和热门搜索，最近搜索是本地存储的',
		code: `<view v-if="!classList.length||noSearch">
	<view class="history" v-if="historySearch.length">
		<view class="topTitle">
			<view class="text">最近搜索</view>
			<view class="icon" @click="removeHistory">
				<uni-icons type="trash" size="25"></uni-icons>
			</view>
		</view>
		<view class="tabs">
			<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{tab}}</view>		
		</view>
	</view>
	
	<view class="recommend">
		<view class="topTitle">
			<view class="text">热门搜索</view>				
		</view>
		<view class="tabs">				
			<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{tab}}</view>
		</view>
	</view>
</view>`
	},
	{
		content: '点击最近搜索或者热门搜索的标签也能直接进行搜索，并且将最新点击的标签排在第一位',
		code: `//点击搜索
const onSearch = ()=>{
	uni.showLoading()
	historySearch.value=[...new Set([queryParams.value.keyword,...historySearch.value])].slice(0,10)
	uni.setStorageSync("historySearch",historySearch.value)
	initParams(queryParams.value.keyword)
	searchData()
}

//点击标签进行搜索
const clickTab = (value)=>{
	initParams(value)
	onSearch()
}`
	}
]