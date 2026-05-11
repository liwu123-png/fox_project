"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const classList = common_vendor.ref([]);
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(0);
    const currentInfo = common_vendor.ref(null);
    const readImgs = common_vendor.ref([]);
    const isScore = common_vendor.ref(false);
    const storgClassList = common_vendor.index.getStorageSync("storgClassList");
    classList.value = storgClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    common_vendor.onLoad((e) => {
      currentId.value = e.id;
      currentIndex.value = classList.value.findIndex((item) => item._id == currentId.value);
      currentInfo.value = classList.value[currentIndex.value];
      readImgFun();
    });
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
      currentInfo.value = classList.value[currentIndex.value];
      readImgFun();
    };
    console.log(classList.value);
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const clickinfo = () => {
      infoPopup.value.open();
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let { classid, _id: wallId } = currentInfo.value;
      let res = await api_api.apiGetSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        clickScoreClose();
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const clickDownload = () => {
      common_vendor.index.showModal({
        content: "已经下载了壁纸",
        showCancel: false
      });
      common_vendor.index.getImageInfo({
        src: currentInfo.value.picurl,
        success: (res) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.path,
            success: (res2) => {
            }
          });
        }
      });
    };
    function readImgFun() {
      readImgs.value.push(
        currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
      readImgs.value = [...new Set(readImgs.value)];
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: common_vendor.o(maskChange),
            c: item.picurl
          } : {});
        }),
        b: currentIndex.value,
        c: common_vendor.o(swiperChange),
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.o(goBack),
        g: common_vendor.unref(utils_system.getstatusBarHeight)() + "px",
        h: common_vendor.t(currentIndex.value + 1),
        i: common_vendor.t(classList.value.length),
        j: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info",
          size: "23"
        }),
        m: common_vendor.o(clickinfo),
        n: common_vendor.p({
          type: "star",
          size: "23"
        }),
        o: common_vendor.t(currentInfo.value.score),
        p: common_vendor.o(clickScore),
        q: common_vendor.p({
          type: "download",
          size: "23"
        }),
        r: common_vendor.o(clickDownload)
      } : {}, {
        s: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        t: common_vendor.o(clickInfoClose),
        v: common_vendor.t(currentInfo.value._id),
        w: common_vendor.t(currentInfo.value.nickname),
        x: common_vendor.p({
          readonly: true,
          touchable: true,
          value: currentInfo.value.score,
          size: "16"
        }),
        y: common_vendor.t(currentInfo.value.score),
        z: common_vendor.t(currentInfo.value.description),
        A: common_vendor.f(currentInfo.value.tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab)
          };
        }),
        B: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        C: common_vendor.p({
          type: "bottom"
        }),
        D: common_vendor.t(isScore.value ? "评分过了~" : "壁纸评分"),
        E: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        F: common_vendor.o(clickScoreClose),
        G: common_vendor.o(($event) => userScore.value = $event),
        H: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: userScore.value
        }),
        I: common_vendor.t(userScore.value),
        J: common_vendor.o(submitScore),
        K: !userScore.value || isScore.value,
        L: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        M: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
