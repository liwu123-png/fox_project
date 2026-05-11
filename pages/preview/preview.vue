<template>
	<view class="preview">
		<swiper circular :current="currentIndex"@change="swiperChange">
			<swiper-item v-for="(item,index) in classList">
				<image v-if="readImgs.includes(index)"@click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
			
		<view class="mask" v-if="maskState">
			<view class="goBack"@click="goBack"
			:style="{top:getstatusBarHeight()+'px'}">
				<uni-icons type="back"color="#fff"size="20"></uni-icons>
			</view>
			<view class="count"> {{currentIndex+1}} / {{classList.length}} </view>
			<view class="Time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickinfo">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box"@click="clickScore">
					<uni-icons type="star" size="23"></uni-icons>
					<view class="text">{{currentInfo.score}}</view>
				</view>
				<view class="box"@click="clickDownload">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close"@click="clickInfoClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="lable">壁纸ID：
							</view>
							<text selectable class="value">{{currentInfo._id}}</text>
						</view>
						<!-- <view class="row">
							<view class="lable">分类：
							</view>
							<text selectable class="value class">明星美女</text>
						</view> -->
						<view class="row">
							<view class="lable">发布者：
							</view>
							<text selectable class="value">{{currentInfo.nickname}}</text>
						</view>
						<view class="row">
							<view class="lable">评分：
							</view>
							<view class="value rotBox">
							<uni-rate readonly touchable :value="currentInfo.score" size="16"/>
							<text selectable class="score">{{currentInfo.score}}</text>
							</view>
						</view>
						<view class="row">
							<view class="lable">摘要：
							</view>
							<text selectable class="value">{{currentInfo.description}}</text>
						</view>
						<view class="row">
							<view class="lable">标签：
							</view>
							<view class="value tabs">
							<text selectable class="tab" v-for="tab in currentInfo.tabs">{{tab}}</text>
							
							</view>
						</view>
						<view class="copyright">
							声明：本图片来自于身材包浆豆腐你看没得吃你能否v符合报考说法v犯困粉嫩嫩，维护你的痊愈
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="scorePopup":is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{isScore?'评分过了~':'壁纸评分'}}</view>
					<view class="close"@click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore"allowHalf
					 :disabled="isScore"
					 disabled-color="#FFCA3E"/>
					<text class="text">{{userScore}}分</text>
				</view>
				<view class="footer">
					<button @click="submitScore"
					:disabled="!userScore || isScore"type="default"size="mini"plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import {onLoad}from"@dcloudio/uni-app"
	import {getstatusBarHeight} from "@/utils/system.js"
	import {apiGetSetupScore}from "@/api/api.js"
	const maskState = ref(true);
	const infoPopup = ref(null);
	const scorePopup=ref(null);
	const userScore=ref(0);
	const classList=ref([]);
	const currentId=ref(null);
	const currentIndex=ref(0);
	const currentInfo=ref(null);
	const readImgs = ref([]);
	const isScore=ref(false);
	const storgClassList=uni.getStorageSync("storgClassList");
	classList.value=storgClassList.map(item=>{
		return {
			...item,
			picurl:item.smallPicurl.replace("_small.webp",".jpg")
		}
	})
	
	onLoad((e)=>{
		currentId.value=e.id;
		 currentIndex.value=classList.value.findIndex(item=>item._id==currentId.value)
		 currentInfo.value = classList.value[currentIndex.value]
		 readImgFun();
	})
	
	const swiperChange=(e)=>{
		currentIndex.value=e.detail.current;
		currentInfo.value = classList.value[currentIndex.value]
		readImgFun();
	}
	console.log(classList.value);
	//遮罩状态
	const maskChange = () => {
		maskState.value = !maskState.value;
	}

	//弹窗
	const clickinfo = () => {
		infoPopup.value.open();
	}
	//点击关闭弹窗
	const clickInfoClose=()=>{
		infoPopup.value.close();
	}
	//评分弹窗
	const clickScore=()=>{
		if(currentInfo.value.userScore){
			isScore.value=true;
			userScore.value=currentInfo.value.userScore;
		}
		scorePopup.value.open();
	}
	//关闭评分框
	const clickScoreClose=()=>{
		scorePopup.value.close();
		userScore.value=0;
		isScore.value=false;
	}
	//确认评分
	const submitScore=async ()=>{
		uni.showLoading({
			title:"加载中..."
		})
		let {classid,_id:wallId}=currentInfo.value;
		let res = await apiGetSetupScore({
			classid,
			wallId,
			userScore:userScore.value
		})
		uni.hideLoading();
		if(res.errCode===0){
			uni.showToast({
				title:"评分成功",
				icon:"none"
			})
			classList.value[currentIndex.value].userScore = userScore.value;
			uni.setStorageSync("storgClassList",classList.value);
			clickScoreClose();
		}
		
	}
	//返回上一页
	const goBack=()=>{
		uni.navigateBack()
	}
	//点击下载
	const clickDownload = ()=>{
		//#ifdef H5
		uni.showModal({
			content:"请长按保存壁纸",
			showCancel:false
		})
		//#endif 
		//#ifndef H5
		uni.showModal({
			content:"已经下载了壁纸",
			showCancel:false
		})
		uni.getImageInfo({
			src:currentInfo.value.picurl,
			success:(res)=>{
				uni.saveImageToPhotosAlbum({
					filePath:res.path,
					success:(res)=>{
						
					}
				})
			}
		})
		
		//#endif
	}
	function readImgFun(){
		readImgs.value.push(currentIndex.value<=0?classList.value.length-1:currentIndex.value-1,
		currentIndex.value,
		currentIndex.value>=classList.value.length-1?0:currentIndex.value+1)
		readImgs.value=[...new Set(readImgs.value)];
	}
</script>

<style lang="scss" scoped>
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				width: fit-content;
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
			}
			.goBack {
				width:38px;
				height:38px;
				background:rgba(0,0,0,0.5);
				left:30rpx;
				margin-left:0;
				border-radius: 100px;
				top:0;
				backdrop-filter: blur(10rpx);
				border:1px solid rgba(255,255,255,0.3);
				display:flex;
				align-items: center;
				justify-content: center;
			}

			.count {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}

			.Time {
				top: calc(10vh + 80rpx);
				font-size: 140rpx;
				font-weight: 100;
				line-height: lem;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				background: rgba(255, 255, 255, 0.8);
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);

				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.padding: 2rpx 12rpx;

					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}
		.popHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title{
					color:$text-font-color-2;
					font-size: 26rpx;
				}
				.close{
					padding:6rpx;
				}
		}
		scroll-view{
			max-height: 60vh;
			.content{
				.row{
					display:flex;
					padding:16rpx 0;
					font-size:32rpx;
					line-height:1.7em;
					.lable{
						color:$text-font-color-3;
						width:140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value{
						flex:1;
						width:0;
					}
					.rotBox{
						display: flex;
						align-items: center;
						.score{
							font-size: 26rpx;
							color:$text-font-color-2;
							padding-left: 10rpx;
						}
					}
					.tabs{
						display:flex;
						flex-wrap:wrap;
						.tab{
							border:1px solid $brand-theme-color;
							color:$brand-theme-color;
							font-size: 22rpx;
							padding:10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin:0 10rpx 10rpx 0;
						}
					}
					.class{
						color:$brand-theme-color;
					}
					
				}
				.copyright{
					font-size: 28rpx;
					padding:20rpx;
					background: #f6f6f6;
					color:#666;
					border-radius: 10rpx;
					margin:20rpx 0;
					line-height: 1.6em;
				}
			}
		}
		
	}
	.infoPopup {
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		
	}
	.scorePopup{
		background: #fff;
		padding:30rpx;
		width:70vw;
		border-radius: 30rpx;
		.content{
			padding:30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				color:#FFCA3E;
				padding-left:80rpx;
				width:80rpx;
				line-height: 1em;
				text-align: right;
			}
			
		}
		.footer{
			padding:10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>