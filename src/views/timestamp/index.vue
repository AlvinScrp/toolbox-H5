<template>
  <div>
    <p>
      <label class="form_left">现在：</label>
      <input type="text" class="text" v-model="now.timeStamp" readonly>
      <input type="text" class="text date" v-model="now.date" readonly>
      <!-- <span>控制：</span> -->
      <span v-on:click="onTickingClick" :style="{ color: ticking ? '#E74C3C' : '#009a61' }">&nbsp;{{ ticking ? '⏹停止' :
        '►开始' }}</span>
    </p>
    <p>
      <label class="form_left">时间戳</label>
      <input type="text" class="text" v-model="convert1.timeStamp">
      <span>毫秒(ms)&nbsp;&nbsp;</span>
      <button v-on:click="onConvert1Click" type="button">转换 &rsaquo;</button>
      <input type="text" class="text date" v-model="convert1.date" readonly>
      <span>北京时间</span>
      <!--
            <select id="js_timezone" name="timezone" readonly>
                                    <option value="-1200" >(GMT -12:00) 埃尼威托克岛, 夸贾林环礁</option>
                                    <option value="-1100" >(GMT -11:00) 中途岛, 萨摩亚群岛</option>
                                    <option value="-1000" >(GMT -10:00) 夏威夷</option>
                                    <option value="-900" >(GMT -09:00) 阿拉斯加</option>
                                    <option value="-800" >(GMT -08:00) 太平洋时间(美国和加拿大), 提华纳</option>
                                    <option value="-700" >(GMT -07:00) 山区时间(美国和加拿大), 亚利桑那</option>
                                    <option value="-600" >(GMT -06:00) 中部时间(美国和加拿大), 墨西哥城</option>
                                    <option value="-500" >(GMT -05:00) 东部时间(美国和加拿大), 波哥大, 利马, 基多</option>
                                    <option value="-400" >(GMT -04:00) 大西洋时间(加拿大), 加拉加斯, 拉巴斯</option>
                                    <option value="-330" >(GMT -03:30) 纽芬兰</option>
                                    <option value="-300" >(GMT -03:00) 巴西利亚, 布宜诺斯艾利斯, 乔治敦, 福克兰群岛</option>
                                    <option value="-200" >(GMT -02:00) 中大西洋, 阿森松群岛, 圣赫勒拿岛</option>
                                    <option value="-100" >(GMT -01:00) 亚速群岛, 佛得角群岛 [格林尼治标准时间] 都柏林, 伦敦, 里斯本, 卡萨布兰卡</option>
                                    <option value="0" >(GMT) 卡萨布兰卡，都柏林，爱丁堡，伦敦，里斯本，蒙罗维亚</option>
                                    <option value="100" >(GMT +01:00) 柏林, 布鲁塞尔, 哥本哈根, 马德里, 巴黎, 罗马</option>
                                    <option value="200" >(GMT +02:00) 赫尔辛基, 加里宁格勒, 南非, 华沙</option>
                                    <option value="300" >(GMT +03:00) 巴格达, 利雅得, 莫斯科, 奈洛比</option>
                                    <option value="330" >(GMT +03:30) 德黑兰</option>
                                    <option value="400" >(GMT +04:00) 阿布扎比, 巴库, 马斯喀特, 特比利斯</option>
                                    <option value="430" >(GMT +04:30) 坎布尔</option>
                                    <option value="500" >(GMT +05:00) 叶卡特琳堡, 伊斯兰堡, 卡拉奇, 塔什干</option>
                                    <option value="530" >(GMT +05:30) 孟买, 加尔各答, 马德拉斯, 新德里</option>
                                    <option value="545" >(GMT +05:45) 加德满都</option>
                                    <option value="600" >(GMT +06:00) 阿拉木图, 科伦坡, 达卡, 新西伯利亚</option>
                                    <option value="650" >(GMT +06:30) 仰光</option>
                                    <option value="700" >(GMT +07:00) 曼谷, 河内, 雅加达</option>
                                    <option value="800" selected>(GMT +08:00) 北京, 香港, 帕斯, 新加坡, 台北</option>
                                    <option value="900" >(GMT +09:00) 大阪, 札幌, 首尔, 东京, 雅库茨克</option>
                                    <option value="930" >(GMT +09:30) 阿德莱德, 达尔文</option>
                                    <option value="1000" >(GMT +10:00) 堪培拉, 关岛, 墨尔本, 悉尼, 海参崴</option>
                                    <option value="1100" >(GMT +11:00) 马加丹, 新喀里多尼亚, 所罗门群岛</option>
                                    <option value="1200" >(GMT +12:00) 奥克兰, 惠灵顿, 斐济, 马绍尔群岛</option>
                            </select>
            -->
    </p>
    <p>
      <label class="form_left">北京时间</label>
      <input type="text" class="text date" v-model="convert2.date">
      <!--
            <select id="js_timezone_o" name="timezone" readonly>
                                    <option value="-1200" >(GMT -12:00) 埃尼威托克岛, 夸贾林环礁</option>
                                    <option value="-1100" >(GMT -11:00) 中途岛, 萨摩亚群岛</option>
                                    <option value="-1000" >(GMT -10:00) 夏威夷</option>
                                    <option value="-900" >(GMT -09:00) 阿拉斯加</option>
                                    <option value="-800" >(GMT -08:00) 太平洋时间(美国和加拿大), 提华纳</option>
                                    <option value="-700" >(GMT -07:00) 山区时间(美国和加拿大), 亚利桑那</option>
                                    <option value="-600" >(GMT -06:00) 中部时间(美国和加拿大), 墨西哥城</option>
                                    <option value="-500" >(GMT -05:00) 东部时间(美国和加拿大), 波哥大, 利马, 基多</option>
                                    <option value="-400" >(GMT -04:00) 大西洋时间(加拿大), 加拉加斯, 拉巴斯</option>
                                    <option value="-330" >(GMT -03:30) 纽芬兰</option>
                                    <option value="-300" >(GMT -03:00) 巴西利亚, 布宜诺斯艾利斯, 乔治敦, 福克兰群岛</option>
                                    <option value="-200" >(GMT -02:00) 中大西洋, 阿森松群岛, 圣赫勒拿岛</option>
                                    <option value="-100" >(GMT -01:00) 亚速群岛, 佛得角群岛 [格林尼治标准时间] 都柏林, 伦敦, 里斯本, 卡萨布兰卡</option>
                                    <option value="0" >(GMT) 卡萨布兰卡，都柏林，爱丁堡，伦敦，里斯本，蒙罗维亚</option>
                                    <option value="100" >(GMT +01:00) 柏林, 布鲁塞尔, 哥本哈根, 马德里, 巴黎, 罗马</option>
                                    <option value="200" >(GMT +02:00) 赫尔辛基, 加里宁格勒, 南非, 华沙</option>
                                    <option value="300" >(GMT +03:00) 巴格达, 利雅得, 莫斯科, 奈洛比</option>
                                    <option value="330" >(GMT +03:30) 德黑兰</option>
                                    <option value="400" >(GMT +04:00) 阿布扎比, 巴库, 马斯喀特, 特比利斯</option>
                                    <option value="430" >(GMT +04:30) 坎布尔</option>
                                    <option value="500" >(GMT +05:00) 叶卡特琳堡, 伊斯兰堡, 卡拉奇, 塔什干</option>
                                    <option value="530" >(GMT +05:30) 孟买, 加尔各答, 马德拉斯, 新德里</option>
                                    <option value="545" >(GMT +05:45) 加德满都</option>
                                    <option value="600" >(GMT +06:00) 阿拉木图, 科伦坡, 达卡, 新西伯利亚</option>
                                    <option value="650" >(GMT +06:30) 仰光</option>
                                    <option value="700" >(GMT +07:00) 曼谷, 河内, 雅加达</option>
                                    <option value="800" selected>(GMT +08:00) 北京, 香港, 帕斯, 新加坡, 台北</option>
                                    <option value="900" >(GMT +09:00) 大阪, 札幌, 首尔, 东京, 雅库茨克</option>
                                    <option value="930" >(GMT +09:30) 阿德莱德, 达尔文</option>
                                    <option value="1000" >(GMT +10:00) 堪培拉, 关岛, 墨尔本, 悉尼, 海参崴</option>
                                    <option value="1100" >(GMT +11:00) 马加丹, 新喀里多尼亚, 所罗门群岛</option>
                                    <option value="1200" >(GMT +12:00) 奥克兰, 惠灵顿, 斐济, 马绍尔群岛</option>
                            </select>
            -->
      <button v-on:click="onConvert2Click" type="button">转换 &rsaquo;</button>
      <input type="text" class="text" v-model="convert2.timeStamp" readonly>
      <span>毫秒(ms)</span>

    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: 0,
      ticking: true,
      now: {
        timeStamp: '',
        date: ''
      },
      convert1: {
        timeStamp: '',
        date: ''
      },
      convert2: {
        timeStamp: '',
        date: ''
      }
    }
  },
  methods: {
    onTickingClick () {
      this.ticking = !this.ticking
      this.stopTicking()
      if (this.ticking) {
        this.updateNow()
        this.startTicking()
      }
    },
    onConvert1Click () {
      this.convert1.date = this.timeFormat(parseInt(this.convert1.timeStamp))
    },
    onConvert2Click () {
      const date = new Date(this.convert2.date)
      this.convert2.timeStamp = date.getTime()
    },
    timeFormat (timestamp) {
      const prefixZero = function (value) {
        return value < 10 ? `0${value}` : `${value}`
      }
      const date = new Date(timestamp)
      const y = date.getFullYear()
      const m = prefixZero(date.getMonth() + 1)
      const d = prefixZero(date.getDate())
      const h = prefixZero(date.getHours())
      const minute = prefixZero(date.getMinutes())
      const second = prefixZero(date.getSeconds())
      const milliseconds = date.getMilliseconds()
      console.log('timeFormat', timestamp, y, m, d, h)
      return `${y}-${m}-${d} ${h}:${minute}:${second}.${milliseconds}`
    },
    updateNow () {
      const timeStamp = new Date().getTime()
      this.now.timeStamp = timeStamp
      this.now.date = this.timeFormat(timeStamp)
    },
    startTicking () {
      this.timer = setInterval(() => { this.updateNow() }, 1000)
    },
    stopTicking () {
      clearInterval(this.timer)
    }

  },
  mounted () {
    this.startTicking()
  },
  beforeDestroy () {
    this.stopTicking()
  }
}
</script>
<style lang='less' scoped>
.form_left {
  width: 60px;
  float: left;
  padding: 4px 0;
}

p {
  margin-bottom: 25px;
}

label {
  font-size: 15px;
  font-weight: 500;
  height: 32px;
  line-height: 32px;
}

.now {
  width: 400px;
}

.date {
  width: 265px;
}

span {
  font-size: 15px;
  font-weight: 500;
}

input {
  height: 25px;
  width: 200px;
  margin-top: 4px;
  margin-bottom: 4px;
  background-color: #F1F1F1;
  font-size: 15px;
  outline: none;
  border-radius: 5px;
  border: 2px solid #ffffff;
  padding-left: 5px;
}

input:focus {
  outline: none;
  border: 2px solid var(--primary-color);
}

button {
  margin: 0 7px 0 0;
  background-color: #fff;
  border: 1px solid #009a61;
  text-decoration: none;
  font-weight: 700;
  color: #009a61;
  cursor: pointer;
  width: auto;
  overflow: visible;
  padding: 4px 7px 3px;
  font-size: 12px;
  line-height: 130%;
  font-family: "Lucida Grande", Tahoma, Arial, Verdana, sans-serif;
  box-shadow: 0 2px 0 rgba(0, 0, 0, .02);
}

select {
  height: 25px;
  line-height: 25px;
  border: 1px solid rgb(118, 118, 118);

  border-radius: 0px;
}
</style>
