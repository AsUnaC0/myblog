export const xtxUniappData = [
    {
        bigtitle: '整体架构',
        image: require("@/assets/blogImages/xtxUniapp/main.png"),
    },
    {
        content: 'utils文件自定义了请求函数，添加了baseURL,添加了拦截器',
    },
    {
        content: 'pagesMember和pagesOrder是分包页面'
    },
    {
        content: 'pages根据业务逻辑不同，分成不同的模块'
    },
    {
        content: 'services里面根据不同业务逻辑封装了一些请求函数',
        image: require("@/assets/blogImages/xtxUniapp/service.jpg")
    },
    {
        content: '将重复的代码封装成组合式函数，放在composables里面，方便复用'
    },
    {
        content: '定义了两个仓库，一个存放用户信息，一个存放用户当前选择的地址'
    },
    {
        bigtitle: "一、首页模块",
        content: "首页主要有轮播图，首页分类，热门推荐，猜你喜欢组成。",
        image: require("@/assets/blogImages/xtxUniapp/shouye.jpg")
    },
    {
        smalltitle: "1. 自定义导航栏",
        content: "新建业务组件",
    },
    {
        content: '修改页面配置，隐藏默认导航栏，修改文字颜色',
        image: require("@/assets/blogImages/xtxUniapp/home_picture_1.png"),
        code: `// src/pages.json
{
"path": "pages/index/index",
"style": {
  "navigationStyle": "custom", // 隐藏默认导航
  "navigationBarTextStyle": "white",
  "navigationBarTitleText": "首页"
}
}`
    },
    {
        code: `<!-- src/pages/index/componets/CustomNavbar.vue -->
<script>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
<!-- 顶部占位 -->
<view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
  <!-- ...省略 -->
</view>
</template>`
    },
    {
        smalltitle: "2. 轮播图组件",
        content: "封装成组件，以便在多个页面复用",
        image: require("@/assets/blogImages/xtxUniapp/home_picture_3.png"),
        code: `<script setup>
const props = defineProps({
list: {
  type: Array,
  required: true,
  default: () => [] // 如果是可选参数可以加默认值
},
})

</script>

<template>
<view class="carousel-container">
  <swiper 
    class="carousel"
    :autoplay="true"
    :circular="true" 
    :interval="3000"
    indicator-dots=true
    indicator-active-color='rgba(162, 255, 213, 0.4)'
  >
    <swiper-item v-for="item in props.list" :key="item.id">
      <navigator url="/pages/index/index" hover-class="none" class="navigator">
        <image
          mode="aspectFill"
          class="image"
          :src="item.imgUrl"
        ></image>
      </navigator>
    </swiper-item>
  </swiper>
</view>
</template>`
    },
    {
        content: '父组件使用只需要传递数据即可',
        code: `<XtxSwiper :list="bannerList"></XtxSwiper>`
    },
    {
        smalltitle: "3. 首页分类和热门推荐",
        content: "都封装成了组件，在首页初始化时获取数据，传递给组件。",
        code: `<!-- 分类面板 -->
<CategoryPanel :list="categoryList"></CategoryPanel>
<!-- 热门推荐 -->
<HotPanel :list='hotList'></HotPanel>`
    },
    {
        smalltitle: "4. 猜你喜欢组件",
        content: "此组件会在多个页面使用，放在了最外层的components里面，方便其他页面直接使用，不需导入。",
    },
    {
        content: '并且向外暴露了组件内部的方法，方便父组件调用',
        code: `<script setup>
import { onMounted, ref } from 'vue';
import {getHomeGoodsGuessLikeAPI}from'@/services/home.js'

// 分页参数
const pageParams={
  page:1,
  pageSize:10
}

//猜你喜欢的列表
const guessList=ref([])
// 已结束标记
const finish=ref(false)
  // 获取猜你喜欢数据
const getHomeGoodsGuessLikeData=async()=>{
  // 退出判断
  if(finish.value)
  {
      uni.showToast({
          icon:'none',
          title:'没有更多数据了~'
      })
      return
  }
  const res=await getHomeGoodsGuessLikeAPI(pageParams)
  // 数组追加
  guessList.value.push(...res.result.items)
  if(pageParams.page<res.result.pages)
  {
  // 页码的累加
  pageParams.page++
  }else{
      finish.value=true
  }
}

// 重置数据
const resetData=()=>{
  pageParams.page=1
  guessList.value=[]
  finish.value=false
}

// 组件挂在完毕
onMounted(()=>{
  getHomeGoodsGuessLikeData()
})
// 暴露方法
defineExpose({
  getMore:getHomeGoodsGuessLikeData,
  resetData
})
</script>`
    },
    {
        smalltitle: "5. 下拉刷新",
        content: '通过scroll-view触发refresherrefresh事件，实现下拉刷新功能',
    },
    {
        content: '重新调用获取数据的方法，对于猜你喜欢组件，就可以调用组件内部的方法重置分页参数',
        code: `<template>
      <!-- 导航栏 -->
  <CustomNavbar></CustomNavbar>
  
      <scroll-view :refresher-triggered="isTriggered"
  refresher-enabled @refresherrefresh="onRefresherrefresh"
  @scrolltolower="onScrolltolower" class="scroll-view" scroll-y="true" >
          <!-- 骨架屏组件 -->
          <pageSkeleton v-if="isLoading"></pageSkeleton>
          <template v-else>
          <!-- 轮播图 -->
          <XtxSwiper :list="bannerList"></XtxSwiper>
          <!-- 分类面板 -->
          <CategoryPanel :list="categoryList"></CategoryPanel>
          <!-- 热门推荐 -->
          <HotPanel :list='hotList'></HotPanel>
          <!-- 猜你喜欢-->
          <XtxGuess ref="guessRef"></XtxGuess>
          </template>
  </scroll-view>
  
</template>

<script setup>
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar/CustomNavbar.vue'
import XtxSwiper from './components/XtxSwiper/XtxSwiper.vue'
import CategoryPanel from './components/CategoryPanel/CategoryPanel.vue'
import HotPanel from './components/HotPanel/HotPanel.vue'
import pageSkeleton from './components/pageSkeleton/pageSkeleton.vue'
import { getHomeBannerAPI,getHomeCategoryAPI,getHomeHotAPI } from '@/services/home.js'
import {onLoad} from'@dcloudio/uni-app'
import { useGuessList } from '../../composables'

// 获取轮播图数据
const bannerList=ref([])
const getHomeBannerData=async()=>{
  const res=await getHomeBannerAPI()
  bannerList.value=res.result
}

// 获取前台分类数据
const categoryList=ref([])
const getHomeCategoryData=async()=>{
  const res=await getHomeCategoryAPI()
  categoryList.value=res.result
}

// 获取热门推荐数据
const hotList=ref([])
const getHomeHotData=async()=>{
  const res=await getHomeHotAPI()
  hotList.value=res.result
}

// 猜你喜欢组合式函数调用
const {guessRef,onScrolltolower}=useGuessList()

const isTriggered=ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh=async()=>{
  isTriggered.value=true
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(),getHomeCategoryData(),getHomeHotData(),guessRef.value?.getMore()])
  isTriggered.value=false
}

// 是否加载中的标记
const isLoading=ref(false)

onLoad(async()=>{
  isLoading.value=true
  await Promise.all([getHomeBannerData(),
  getHomeCategoryData(),
  getHomeHotData()
  ])
  
  isLoading.value=false
})
</script>`
    },
    {
        content: '通过组合式函数useGuessList()，可以将获取猜你喜欢数据的逻辑抽离出来，方便在其他页面复用,减少重复代码的书写',
        code: `import {ref} from 'vue'

// 猜你喜欢组合式函数

export const useGuessList=()=>{
  // 获取猜你喜欢组件实例
  const guessRef=ref()
  
  // 滚动触底事件
  const onScrolltolower=()=>{
      guessRef.value?.getMore()
  }
  
  return{
      guessRef,
      onScrolltolower
  }
}`
    },
    {
        bigtitle: "二、商品推荐模块",
        content: "推荐模块的布局结构是相同的，因此我们可以复用相同的页面及交互，只是所展示的数据不同",
        image: require("@/assets/blogImages/xtxUniapp/hot_picture_1.png")
    },
    {
        content: ' 点击不同的分类，通过路由传参，传递不同的type',
        image: require("@/assets/blogImages/xtxUniapp/hotPanel.jpg"),
    },
    {
        smalltitle: '1. 动态获取数据',
        content: '根据传递过来的type，请求相应的的数据',
        code: `// 热门推荐页 标题和url
const hotMap = [
{ type: '1', title: '特惠推荐', url: '/hot/preference' },
{ type: '2', title: '爆款推荐', url: '/hot/inVogue' },
{ type: '3', title: '一站买全', url: '/hot/oneStop' },
{ type: '4', title: '新鲜好物', url: '/hot/new' },
]

省略....

// 推荐封面图
const bannerPicture=ref('')
// 推荐选项
const subTypes=ref([])

// 获取页面参数
onLoad((option)=>{
  hotData.value= hotMap[option.type-1]
  // 动态设置标题
  uni.setNavigationBarTitle({
      title:hotData.value.title
  })
  getHotRecommentData()
})

// 获取热门推荐数据
const getHotRecommentData=async()=>{
const res=await	getHotRecommentAPI(hotData.value.url,{
  // 技巧:环境变量,开发环境,修改初始页面方便测试分页结束
  page:import.meta.env.DEV?30:1,
  pageSize:10
})
bannerPicture.value=res.result.bannerPicture
subTypes.value=res.result.subTypes
}
`
    },
    {
        smalltitle: '2. 多 Tabs 分页加载',
        image: require("@/assets/blogImages/xtxUniapp/tabs.jpg"),
    },
    {
        content: '请求的数据我通过v-for渲染到scroll-view中，通过点击不同的tab,改变activeIndex的值，改变不同scroll-view的v-show属性,来实现分类数据的展示',
        code: `<script setup>
// 高亮的下标
const activeIndex = ref(0)
</script>

<template>
<!-- 推荐选项 -->
<view class="tabs">
  <text
    class="text"
    v-for="(item, index) in subTypes"
    :key="item.id"
    :class="{ active: index === activeIndex }"
    @tap="activeIndex = index"
  >
    {{ item.title }}
  </text>
</view>
<!-- 推荐列表 -->
<scroll-view
  scroll-y
  class="scroll-view"
  v-for="(item, index) in subTypes"
  :key="item.id"
  v-show="activeIndex === index"
>
  ...省略
</scroll-view>
</template>`
    },
    {
        smalltitle: '3. 滑动触底加载更多',
        content: ' 通过scroll-view的scrolltolower事件触发加载更多',
        image: require("@/assets/blogImages/xtxUniapp/loadmore.jpg"),
    },
    {
        content: '触底请求的新数据，追加到当前选项的老数据中',
        code: `// 滚动触底
      const onScrolltolower=async()=>{
        // 获取当前选项
        const currsubTypes= subTypes.value[activeIndex.value]
        // 分页条件
        if(currsubTypes.goodsItems.page<currsubTypes.goodsItems.pages)
        {
          // 当前页码累加
          currsubTypes.goodsItems.page++
        }else{
          // 标记已结束
          currsubTypes.finish=true
          return uni.showToast({
            icon:"none",
            title:"没有更多数据了..."
          })
        }
        
        // 调用API传参
        const res=await getHotRecommentAPI(hotData.value.url,{
          subType:currsubTypes.id,
          page:currsubTypes.goodsItems.page,
          pageSize:currsubTypes.goodsItems.pageSize
        })
        // 触底加载的新的列表选项
        const newsubTypes=res.result.subTypes[activeIndex.value]
        // 数组追加
        currsubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
      }`
    },
    {
        bigtitle: '三、分类模块',
        content: '这里的数据展示与之前的多taps分页加载类似，通过高亮下标提取不同的分类数据。轮播图也复用最开始封装的组件。',
        image: require("@/assets/blogImages/xtxUniapp/fenlei.jpg"),
    },
    {
        content: '根据activeIndex的值，提取不同的二级分类数据',
        code: `// 获取分类列表数据
const categoryList=ref([])
const activeIndex=ref(0)
const getCategoryTopData=async()=>{
  const res=await getCategoryTopAPI()
  categoryList.value=res.result
}

...省略

// 提取当前二级分类数据
const subCategoryList=computed(()=>{
  return categoryList.value[activeIndex.value]?.children||[]
})`
    },
    {
        bigtitle: '四、详情模块',
        image: require("@/assets/blogImages/xtxUniapp/goods.jpg"),
        content: '根据商品的 id 查询到某个商品的详细信息，如图片、价格、型号等展示给用户。'
    },
    {
        smalltitle: '1. 动态获取商品详情',
        content: '每个商品都有id,点击商品时，通过路由传参，将id传递给详情页',
        image: require("@/assets/blogImages/xtxUniapp/goods1.jpg"),
        code: `// 接受页面参数
onLoad((option)=>{
   getGoodsByIdData(option.id)
})

// 获取商品详情信息
const goods=ref()
const getGoodsByIdData=async(id)=>{
  const res=await getGoodsByIdAPI(id)
  goods.value=res.result

...省略

}`
    },
    {
        smalltitle: '2. 轮播图交互',
        content: '点击图片放大',
        image: require("@/assets/blogImages/xtxUniapp/goods_picture_2.png"),
        code: `// 点击图片 触发这个方法
const onTapImage=(item)=>{
  uni.previewImage({
      current:item,
      urls:goods.value.mainPictures
  })
}`
    },
    {
        smalltitle: '3. 弹出层交互',
        image: require("@/assets/blogImages/xtxUniapp/goods_picture_3.png"),
        code: `//父组件
<script setup>
// 弹出层
const popup=ref()

// 弹出层条件渲染
const popupName=ref()
const openPopup=(name)=>{
  popupName.value=name
  popup.value?.open()
}
</script>

<template>
<!-- 操作面板 -->
    <view class="action">
      <view @tap="openPopup('address')" class="item ">
        <text class="label">送至</text>
        <text class="text ellipsis"> 请选择收获地址 </text>
      </view>
      <view @tap="openPopup('service')" class="item ">
        <text class="label">服务</text>
        <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
      </view>
    </view>
  </view>
<!-- uni-ui弹出层-->
<uni-popup ref="popup" type="bottom" background-color="#fff">
   <AddressPanel v-if="popupName==='address'" @close="popup?.close()"></AddressPanel>
   <ServicePanel v-if="popupName==='service'" @close="popup?.close()"></ServicePanel>
</uni-popup>
</template>`
    },
    {
        content: '关闭弹出层时，子传父即可',
        code: `//子组件
<script setup>
const emit = defineEmits(['close'])

</script>

<template>
<view class="service-panel">
  <!-- 关闭按钮 -->
  <text class="close" @tap="emit('close')">X</text>
</template>`
    },
    {
        bigtitle: '五、登录模块',
        content: '由于微信登录需要企业级APPID,所以这里使用了uniapp的登录组件，提供了模拟登录和微信快速登录两种方式。',
        image: require("@/assets/blogImages/xtxUniapp/login.jpg"),
    },
    {
        content: '',
        code: `// 获取code 登录凭证
      // 获取用户手机号码
      const ongetPhoneNumber=async(e)=>{
        const code=await wx.login()
        const encryptedData= e.detail?.encryptedData
        const iv=e.detail?.iv
        const res=await postLoginWxMinAPI({
          code:code.code,
          encryptedData,
          iv
        })
      }
      
      // 模拟手机号码快捷登录
      const ongetPhoneNumbersimple=async()=>{
        const res=await postLoginWxMinSimpleAPI('159xxxx0806')
        // 保存会员信息
        const memberStore=useMemberStore()
        memberStore.setProfile(res.result)
        uni.showToast({
          icon:'success',
          title:'登录成功'	
        })
        setTimeout(()=>{
        uni.navigateBack()
        },500)
      
      }`
    },
    {
        content: '出于安全限制，小程序规定想获取用户的手机号，必须由用户主动点击按钮并允许申请才可获取加密的手机号信息,所以提供 `open-type` 按钮，在事件处理函数中获取加密的手机号信息',
        code: `<button class="button phone" open-type="getPhoneNumber" @getphonenumber='ongetPhoneNumber' >
手机号快捷登录
</button>`
    },
    {
        bigtitle: '六、用户模块',
        smalltitle: '1. 用户中心',
        content: '从store中获取用户信息，展示在用户中心页面,复用猜你喜欢组件,同样使用原来分装好的组合式函数对组件触底加载进行处理',
        image: require("@/assets/blogImages/xtxUniapp/my.jpg"),
    },
    {
        smalltitle: '2. 分包页面',
        content: '将用户中心的设置页和用户详情页放在了分包里面，分包的好处是可以减少主包的体积，提高加载速度。',
        image: require("@/assets/blogImages/xtxUniapp/fenye.jpg"),
    },
    {
        content: '分包的文件我放在了新建的pagesMember里面，在pages.json中配置分包的路径和页面',
        code: `// src/pages.json
{
// ...省略
// 分包加载规则
"subPackages": [
  {
    // 子包的根目录
    "root": "pagesMember",
    // 页面路径和窗口表现
    "pages": [
      {
        "path": "settings/settings",
        "style": {
          "navigationBarTitleText": "设置"
        }
      },
      {
        "path": "profile/profile",
        "style": {
          "navigationStyle": "custom",
          "navigationBarTextStyle": "white",
          "navigationBarTitleText": "个人信息"
        }
      }
    ]
  }
],
// 分包预下载规则
"preloadRule": {
  "pages/my/my": {
    "network": "all",
    "packages": ["pagesMember"]
  }
}
}`
    },
    {
        smalltitle: '3. 设置页面',
        content: '根据用户的登录状态，展示不同的内容',
        image: require("@/assets/blogImages/xtxUniapp/member_picture_3.png"),
    },
    {
        content: '通过v-if看store中的登录状态，条件渲染即可',
        code: `<template>
<view class="viewport">
  <!-- 列表1 -->
  <view class="list" v-if="memberStore.profile">
    <navigator url="/pagesMember/address/address" hover-class="none" class="item ">
      我的收货地址
    </navigator>
  </view>
...省略
  <!-- 操作按钮 -->
  <view class="action" v-if="memberStore.profile">
    <view @tap="onLogout" class="button">退出登录</view>
  </view>
</view>
</template>`
    },
    {
        smalltitle: '4. 个人信息页面',
        content: '进入页面后，获取用户信息并展示在页面上,更新数据点击保存时，调用接口更新用户信息',
    },
    {
        content: '头像上传，使用uni-app的文件上传组件,通过 `uni.chooseMedia()` 读取用户相册的照片或者拍照,通过 `uni.uploadFile()` 上传用户图片',
        code: `// 修改头像
const onavatarChange=()=>{
  // 调用拍照选择图片
  uni.chooseMedia({
      // 文件个数
      count:1,
      // 文件类型
      mediaType:['image'],
      success:(res)=>{
          // 本地路径
          const {tempFilePath}=res.tempFiles[0]
          // 文件上传
          uploadFile(tempFilePath)
      }
  })

// 文件上传的封装
const uploadFile=(tempFilePath)=>{
  uni.uploadFile({
      url:'/member/profile/avatar',
      name:'file',
      filePath:tempFilePath,
      success:(res)=>{
          if(res.statusCode===200){
              const avatar=JSON.parse(res.data).result.avatar
              // 个人信息页数据更新
              profile.value.avatar=avatar
              // Store里面的头像更新
              memberStore.profile.avatar=avatar
                  uni.showToast({
                      icon:'success',
                      title:'更新成功'
                  })
          }else{
              uni.showToast({
                  icon:'error',
                  title:res.data
              })
          }
      }
  })
}  `
    },
    {
        content: '城市的选择和生日的选择，使用了picker组件，修改通过`@change`事件获取用户选择的数据',
        code: `<script setup>
// 修改城市
let fullLocationCode=[]
const onFullLocationChange=(e)=>{
  // 修改前端界面
  profile.value.fullLocation=e.detail.value.join(' ')
  // 提交后端更新用的地址码
  fullLocationCode=e.detail.code
}
// 修改生日
const onBirthdayChange=(e)=>{
  profile.value.birthday=e.detail.value
}
</script>

<template>
// 修改生日
<picker
        @change="onBirthdayChange"
    class="picker"
    mode="date"
    start="1900-01-01"
    :end="new Date()"
    :value="profile?.birthday">
    <view v-if="profile?.birthday">{{profile?.birthday}}</view>
    <view class="placeholder" v-else>请选择日期</view>
  </picker>

// 城市选择的picker组件
<picker @change="onFullLocationChange" class="picker" mode="region" :value="profile?.fullLocation?.split(' ')">
    <view v-if="profile?.fullLocation">{{profile?.fullLocation}}</view>
    <view class="placeholder" v-else>请选择城市</view>
</picker>
</template>`
    },
    {
        content: '性别的选择使用了radio组件，修改通过`@change`事件获取用户选择的数据',
        code: `<script setup>
// 修改性别
const onGenderChange=(e)=>{
  profile.value.gender=e.detail.value
}
</script>

<template>
        <radio-group @change="onGenderChange">
          <label class="radio">
            <radio value="男" color="#27ba9b" :checked="profile?.gender==='男'" />
            男
          </label>
          <label class="radio">
            <radio value="女" color="#27ba9b" :checked="profile?.gender==='女'" />
            女
          </label>
        </radio-group>
</template>`
    },
    {
        content: '其他数据更新，直接v-model修改profile对象即可，点击保存时，调用接口更新用户信息',
        code: `// 点击保存提交表单
const onSubmit=async()=>{
  const {nickname,gender,birthday,profession}=profile.value
  const res= await putMemberProfileAPI({
      nickname,
      gender,
      birthday,
      profession,
      provinceCode:fullLocationCode[0],
      cityCode:fullLocationCode[1],
      countyCode:fullLocationCode[2],
  })
  // 更新store的昵称
  memberStore.profile.nickname=res.result.nickname
  // 更新生日
  memberStore.profile.birthday=res.result.birthday
  // 更新城市
  memberStore.profile.fullLocation=res.result.fullLocation
  uni.showToast({
      icon:'success',
      title:'保存成功'
  })
  setTimeout(()=>{
      uni.navigateBack()
  },400)
}`
    },
    {
        bigtitle: '七、地址模块',
        content: '地址模块共两个页面：地址管理页，地址表单页,这两个也封装成组件放在pagesMember里面',
        image: require("@/assets/blogImages/xtxUniapp/address_picture_1.png"),
    },
    {
        content: '在page.json里面的分包里面添加这两个的配置',
        code: `        {
        "path": "address/address",
        "style": {
          "navigationBarTitleText": "地址管理"
        }
      },
      {
        "path": "address-form/address-form",
        "style": {
          "navigationBarTitleText": ""
        }
      }`
    },
    {
        smalltitle: '1. 地址管理页面',
        content: '通过uni-swipe-action渲染地址列表,左滑地址出现删除按钮，点击删除按钮，调用接口删除地址',
        image: require("@/assets/blogImages/xtxUniapp/address.jpg"),
    },
    {
        smalltitle: '2. 地址表单页面',
        content: '地址表单页面分为新增地址和修改地址两种场景,通过路由传参判断当前是新增还是编辑,有数据就进行回显',
        code: `// 获取页面参数
onLoad(async(option)=>{
// 动态设置标题
uni.setNavigationBarTitle({
  title:option.id?'修改地址':'新建地址'
})

// 有id,就发送请求获取地址详情
if(option.id){
  queryId=option.id
  const res=await getMemberAddressByIdData(option.id)
  Object.assign(form.value,res.result)
}
})

// 获取收货地址详情数据
const getMemberAddressByIdData=async(id)=>{
  return await getMemberAddressByIdAPI(id)
}`
    },
    {
        smalltitle: '3. 表单校验',
        content: '使用了uni-forms组件进行表单校验，校验通过后，调用接口新增或修改地址',
    },
    {
        content: '定义校验规则 绑定校验规则 提交时校验表单',
        code: `<script setup>
// 定义校验规则
const rules: UniHelper.UniFormsRules = {
receiver: {
  rules: [{ required: true, errorMessage: '请输入收货人姓名' }],
},
contact: {
  rules: [
    { required: true, errorMessage: '请输入联系方式' },
    { pattern: /^1[3-9]\\d{9}$/, errorMessage: '手机号格式不正确' },
  ],
},
countyCode: {
  rules: [{ required: true, errorMessage: '请选择所在地区' }],
},
address: {
  rules: [{ required: true, errorMessage: '请选择详细地址' }],
},
}

// 获取表单组件实例，用于调用表单方法
const formRef = ref()

// 提交表单
const onSubmit = async () => {
try {
  // 表单校验
  await formRef.value.validate()
  // 校验通过后再发送请求
  if(queryId){
    // 修改地址请求
    await putMemberAddressAPI(queryId,form.value)
  } else {
    // 新建地址请求
    await postMemberAddressAPI(form.value)
  }
  // 成功提示
  uni.showToast({ icon: 'success', title: queryId ? '修改成功' : '新建成功' })
  // 返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 400)
} catch (error) {
  uni.showToast({ icon: 'error', title: '请填写完整信息' }) 
}
}
</script>

<template>
<view class="content">
  <uni-forms :rules="rules" :model="form" ref="formRef">
    <!-- 表单内容 -->
    <uni-forms-item name="receiver" class="form-item">
      <text class="label">收货人</text>
      <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
    </uni-forms-item>
    <uni-forms-item name="contact" class="form-item">
      <text class="label">手机号码</text>
      <input
        class="input"
        placeholder="请填写收货人手机号码"
        :maxlength="11"
        v-model="form.contact"
      />
    </uni-forms-item>
    <uni-forms-item name="countyCode" class="form-item">
      <text class="label">所在地区</text>
      <picker
        class="picker"
        @change="onRegionChange"
        mode="region"
        :value="form.fullLocation.split(' ')"
      >
        <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
        <view v-else class="placeholder">请选择省/市/区(县)</view>
      </picker>
    </uni-forms-item>
    <uni-forms-item name="address" class="form-item">
      <text class="label">详细地址</text>
      <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
    </uni-forms-item>
    <view class="form-item">
      <label class="label">设为默认地址</label>
      <switch
        class="switch"
        color="#27ba9b"
        @change="onSwitchChange"
        :checked="form.isDefault === 1"
      />
    </view>
  </uni-forms>
</view>
<!-- 提交按钮 -->
<button @tap="onSubmit" class="button">保存并使用</button>
</template>`
    },
    {
        bigtitle: '八、SKU模块',
        smalltitle: '1. 直接下载SKU插件使用',
        image: require("@/assets/blogImages/xtxUniapp/SKU插件.jpg"),
    },
    {
        smalltitle: '2. SKU插件的使用',
        content: '通过v-model控制SKU弹出层的显隐,通过localdata绑定商品SKU数据来源',
    },
    {
        content: '另外通过改变mode的值，改变按钮的样式',
        image: require('@/assets/blogImages/xtxUniapp/SKU.jpg'),
        code: `<template>
  <!-- sku弹窗组件 -->
  <vk-data-goods-sku-popup 
  ref="skuPopupRef" 
  v-model="isShowSku" 
  :localdata='localdata' 
  :mode='mode' 
  add-cart-background-color="#FFA868" 
  buy-now-background-color="#27BA9B"
  :actived-style="{
        color: '#27BA9B',
        borderColor: '#27BA9B',
        backgroundColor: '#E9F8F5',}"
  @add-cart="onAddCart"
  @buy-now="onBuyNow"
      >
      </vk-data-goods-sku-popup>
</template>`
    },
    {
        content: '根据后端传来的数据处理成sku数据格式',
        code: `  // SKU组件所需格式
localdata.value = {
  _id: res.result.id,
  name: res.result.name,
  goods_thumb: res.result.mainPictures[0],
  spec_list: res.result.specs.map((v) => ({ name: v.name, list: v.values })),
  sku_list: res.result.skus.map((v) => ({
    _id: v.id,
    goods_id: res.result.id,
    goods_name: res.result.name,
    image: v.picture,
    price: v.price * 100, // 注意：需要乘以 100
    stock: v.inventory,
    sku_name_arr: v.specs.map((vv) => vv.valueName),
  })),
}`
    },
    {
        content: '通过ref获取组件实例,还可以计算被选中的值渲染到界面中',
        image: require('@/assets/blogImages/xtxUniapp/SKU1.jpg'),
        code: `// sku组件实例
const skuPopupRef=ref()

// 计算被选中的值
const selectArrText=computed(()=>{
  return skuPopupRef.value?.selectArr?.join(' ').trim()||'请选择商品规格'
})`
    },
    {
        bigtitle: '九、购物车模块',
        content: '请求数据渲染购物车列表，购物车商品同样使用了uni-swipe-action,下方复用了猜你喜欢组件',
        image: require("@/assets/blogImages/xtxUniapp/cart.jpg"),
    },
    {
        smalltitle: '1. 购物车商品操作',
        content: '修改商品数量，删除商品，修改商品选中状态直接调用了接口进行更新',
        code: `// 点击删除按钮
const onDeleteCart=(skuId)=>{
  // 弹窗二次确认
  uni.showModal({
      content:'是否删除',
      success:async(res)=> {
          if(res.confirm)
          {
              // 后端删除单品
              await deleteMemberCartAPI({ids:[skuId]})
              // 重新获取列表
              getMemberCartData()
          }
      }
  })
}

// 修改商品数量
const onChangeCount=(e)=>{
  putMemberCartAPI(e.index,{count:e.value})
}

// 修改选中状态
const onChangeSelected=(item)=>{
  // 是否选中进行取反
  item.selected=!item.selected
  // 后端数据更新
  putMemberCartAPI(item.skuId,{selected:item.selected})
}

// 计算全选状态
const isSelectedAll=computed(()=>{
  return cartList.value.length&&cartList.value.every(v=>v.selected)
})

// 改变全选状态
const onChangeSelectedAll=()=>{
  // 全选状态取反
  const _isSelectedAll=!isSelectedAll.value
  
  cartList.value.forEach((item)=>{
      item.selected=_isSelectedAll
  })
  // 后端数据更新
  putMemberCartSelectedAPI({selected:_isSelectedAll})
}`
    },
    {
        content: '下方展示是通过computed计算的',
        image: require("@/assets/blogImages/xtxUniapp/cart2.jpg"),
        code: `
// 计算选中单品列表
const selectedCartList=computed(()=>{
  return cartList.value.filter(v=>v.selected)
})

// 计算选中总件数
const selectedCartListCount=computed(()=>{
  return selectedCartList.value.reduce((sum,item)=>sum+item.count,0)
})

// 计算选中的总价格
const selectedCartListPrice=computed(()=>{
  return selectedCartList.value.reduce((sum,item)=>sum+item.count*item.nowPrice,0).toFixed(2)
})`
    },
    {
        smalltitle: '2. tabBar页面限制',
        content: '从商品页面进入购物车，由于购物车页面是tabBar页面，不能返回上一页,对于用户来说体验不好，所以将购物车业务封装成组件',
        image: require("@/assets/blogImages/xtxUniapp/cart_picture_3.png"),
    },
    {
        content: '将购物车逻辑封装成组件，cart.vue展示tabBar页面的购物车，cart2.vue展示从商品详情页进入的购物车',
        image: require("@/assets/blogImages/xtxUniapp/cart1.jpg"),
        code: `<script setup>
import CartMain from './components/CartMain.vue';

const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view>
          <CartMain :safeArea=safeAreaInsets.bottom></CartMain>
  </view>

</template>

<style lang="less" scoped>
  
</style>`
    },
    {
        bigtitle: '十、订单模块',
        content: '三种方式进入订单页：购物车结算、立即购买、再次购买',
        image: require("@/assets/blogImages/xtxUniapp/ordercreate.jpg"),
    },
    {
        smalltitle: '1. 订单判断',
        content: '判断是直接从商品页面点击立即购买进入订单页，还是从购物车页面结算进入订单页面',
    },
    {
        content: '在商品详情页面点击立即购买会传参',
        image: require("@/assets/blogImages/xtxUniapp/buynow.jpg"),
    },
    {
        content: '从购物车结算没有参数传递',
        code: `const gotoPayment=()=>{
  if(selectedCartListCount.value===0){
      return uni.showToast({
          icon:'none',
          title:'请选择商品'
      })
  }
  // 跳转到结算页面
  uni.navigateTo({
      url: '/pagesOrder/create/create',
  });
}`
    },
    {
        content: '在订单详情页/订单支付页就可以渲染相应的订单信息',
        code: `// 获取订单信息
const orderPre=ref()
const getMemberOrderPreData=async(options)=>{
  // 有参数就是点的立即购买
  if(options.count&&options.skuId)
  {
      // 请求一下默认地址
      const addressData=await getMemberAddressAPI()
      const defaultAddress=addressData.result.find(v=>v.isDefault)
      const addressStore=useAddressStore()
      // 存放到store里面
      addressStore.changeSelectedAddress(defaultAddress)
      const res=await getMemberOrderPreNowAPI({
          count:options.count,
          skuId:options.skuId
      })
      orderPre.value=res.result
  }
  else{
      // 没有参数就是从购物车结算
      const res=await getMemberOrderPreAPI()
      orderPre.value=res.result
  }
  
}

onLoad((options)=>{
  getMemberOrderPreData(options)
})`
    },
    {
        content: '订单的支付和详情用的同一个页面，只不过是订单的状态不一样'
    },
    {
        content: '最后提交订单，上传对应的订单参数,成功后跳转到订单支付页，关闭当前的订单提交页',
        image: require("@/assets/blogImages/xtxUniapp/cart3.jpg"),
    },
    {
        smalltitle: '2. 订单支付',
        content: '会展示该订单信息，并且会有30分钟的倒计时，时间到了商品状态会变成已取消',
        code: `<script setup>
// 订单状态列表
const orderStateList = [
{ id: 0, text: '' },
{ id: 1, text: '待付款' },
{ id: 2, text: '待发货' },
{ id: 3, text: '待收货' },
{ id: 4, text: '待评价' },
{ id: 5, text: '已完成' },
{ id: 6, text: '已取消' },
]


// 倒计时结束
const onTimeup=()=>{
  // 修改订单状态为已取消
  order.value.orderState=6
}

// 订单支付
const onOrderPay=async()=>{
  if(process.env.NODE_ENV){
      // 开发环境调用模拟API
      await getPayMockAPI({orderId:query.value.id})
  }
  else{
      // #ifdef MP-WEIXIN
              // 正式环境下的微信支付
  const res=await getPayWxPayMiniPayAPI({orderId:query.value.id})
  wx.requestPayment(res.result)
      // #endif
  }
  // 关闭当前页
  uni.redirectTo({
//这里应该使用模板字符串
      url:'/pagesOrder/payment/payment?id=query.value.id'
  })
}
</script>
<template>
      <!-- 待付款状态:展示去支付按钮和倒计时 -->
      <template v-if="order?.orderState===1">
        <view class="status icon-clock">等待付款</view>
        <view class="tips">
          <text class="money">应付金额: ¥ {{order.payMoney}}</text>
          <text class="time">支付剩余</text>
          <uni-countdown
          :second="order.countdown"
          @timeup="onTimeup"
          color="#fff"
          :show-day="false"
          :show-colon="false"
          splitor-color="#fff"
          >
          </uni-countdown>
        </view>
        <view class="button" @tap="onOrderPay">去支付</view>
      </template>
</template>
`
    },
    {
        content: '支付成功后，会跳转到支付成功页，关闭当前的支付页',
    },
    {
        smalltitle: '3. 订单详情',
        content: '订单详情页通过v-if渲染不同的订单状态',
        image: require("@/assets/blogImages/xtxUniapp/order.jpg"),
    },
    {
        smalltitle: '4. 订单列表页',
        content: '根据订单的不同状态展示订单列表，并实现多 Tabs 分页加载',
        image: require("@/assets/blogImages/xtxUniapp/order_picture_3.png"),
    }
    , {
        content: '为了更好维护多Tabs列表,把列表抽离成业务组件，在组件内部独立维护列表数据，包括分页，下拉刷新等业务',
        code: `<script setup>
import { ref } from 'vue'
import { onLoad }from '@dcloudio/uni-app'
import OrderList from './components/OrderList.vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// tabs 数据
const orderTabs = ref([
{ orderState: 0, title: '全部' },
{ orderState: 1, title: '待付款' },
{ orderState: 2, title: '待发货' },
{ orderState: 3, title: '待收货' },
{ orderState: 4, title: '待评价' },
])

// 获取页面参数
let query=ref({})
onLoad((options)=>{
  query.value=options
  activeIndex.value=orderTabs.value.findIndex(v=>v.orderState===Number(query.value.type))
})

// 高亮下标
const activeIndex=ref(0)
</script>

<template>
<view class="viewport">
  <!-- tabs -->
  <view class="tabs">
    <text class="item" v-for="(item,index) in orderTabs" :key="item.title" @tap="activeIndex=index"> {{item.title}} </text>
    <!-- 游标 -->
    <view class="cursor" :style="{ left: activeIndex * 20 + '%' }"></view>
  </view>
  <!-- 滑动容器 -->
  <swiper class="swiper" :current="activeIndex" @change="e=>activeIndex=e.detail.current">
    <!-- 滑动项 -->
    <swiper-item v-for="item in orderTabs" :key="item.title">
      <!-- 订单列表 -->
      <OrderList :order-state="item.orderState">	</OrderList>
    </swiper-item>
  </swiper>
</view>
</template>`
    },
    {
        content: '通过父传子传递数据，通知子组件渲染对应的数据',
        code: `<script setup>
import { onMounted, ref } from 'vue';
import { getMemberOrderAPI } from '../../../services/order';
import { getPayWxPayMiniPayAPI } from '../../../services/pay';

// 订单状态列表
const orderStateList = [
{ id: 0, text: '' },
{ id: 1, text: '待付款' },
{ id: 2, text: '待发货' },
{ id: 3, text: '待收货' },
{ id: 4, text: '待评价' },
{ id: 5, text: '已完成' },
{ id: 6, text: '已取消' },
]

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const props=defineProps({
  orderState:Number
})

// 请求参数
const queryParams={
  page:1,
  pageSize:5,
  orderState:props.orderState
}

// 获取订单列表
const orderList=ref([])
const getMemberOrderData=async()=>{
  const res=await getMemberOrderAPI(queryParams)
  orderList.value=res.result.items
}

onMounted(()=>{
  getMemberOrderData()
})
</script>`
    }, {
        smalltitle: '5. 订单页面的分包',
        content: '将订单模块许多页面封装起来分成多个子包，比如订单的详情页，订单列表页等，方便后续维护',
        code: `...省略
    {
    "root": "pagesOrder",
    "pages": [
      {
        "path": "create/create",
        "style": {
          "navigationBarTitleText": "填写订单"
        }
      },
      {
          "path" : "detail/detail",
          "style" : 
          {
              "navigationBarTitleText" : "订单详情",
              "navigationStyle": "custom"
          }
      },
      {
          "path" : "payment/payment",
          "style" : 
          {
              "navigationBarTitleText" : ""
          }
      },
      {
          "path" : "list/list",
          "style" : 
          {
              "navigationBarTitleText" : "订单列表"
          }
      }
    ]
}
    ...省略
  "pages/cart/cart": {
    "network": "all",
    "packages": ["pagesOrder"]
  }`
    }
]