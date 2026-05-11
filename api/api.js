import {request}from "@/utils/request.js"
export function apiGetBanner(){
	return request({
		url:"/homeBanner",
		
		})
	/*
	return uni.request({
			url:"https://tea.qingnian8.com/api/bizhi/homeBanner",
			header:{
				"access-key":"1328433750wuli"
			},
			
		})
		*/
}
export function apigetDayRandom(){
	return request({url:"/randomWall"})
	// return uni.request({
	// 		url:"https://tea.qingnian8.com/api/bizhi/randomWall",
	// 		header:{
	// 			"access-key":"1328433750wuli"
	// 		},
			
	// 	})
}
export function apiGetNotice(data={}){
	return request({
		url:"/wallNewsList",
		data
		})
}
export function apiGetClassify(data={}){
	return request({
		url:"/classify",
		data
		})
}
export function apigetClassList(data={}){
	return request({
		url:"/wallList",
		data
		})
}

export function apiGetSetupScore(data={}){
	return request({
		url:"/setupScore",
		data
		})
}