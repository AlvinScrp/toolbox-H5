<template>
  <div>
    <div class="convert-area">
      <input
        maxlength="1"
        placeholder="字符"
        type="text"
        ref="inputText"
        v-model="charText1"
      />
      <span class="input-arrow">转ascii码:</span>
      <span class="result">{{ asciiText1 }}</span>
      <input
        type="text"
        class="second-input"
        v-model="asciiText2"
        placeholder="ascii码"
      />
      <span class="input-arrow">转字符:</span>
      <span class="result">{{ charText2 }}</span>
      <span style="color: red">{{ errorText }}</span>
    </div>
    <!-- 特殊字符一ascii码(32-47) -->
    <table width="100%">
      <caption class="tcaption">
        特殊字符一ascii码(32-47)
      </caption>
      <tbody>
        <tr>
          <td class="header">字符</td>
          <td width="100px">空格(space)</td>
          <td>!</td>
          <td>"</td>
          <td>#</td>
          <td>$</td>
          <td>%</td>
          <td>&</td>
          <td>,</td>
          <td>(</td>
          <td>)</td>
          <td>*</td>
          <td>+</td>
          <td>,</td>
          <td>-</td>
          <td>.</td>
          <td>/</td>
        </tr>
        <tr>
          <td class="header">ascii码</td>
          <td>32</td>
          <td>33</td>
          <td>34</td>
          <td>35</td>
          <td>36</td>
          <td>37</td>
          <td>38</td>
          <td>39</td>
          <td>40</td>
          <td>41</td>
          <td>42</td>
          <td>43</td>
          <td>44</td>
          <td>45</td>
          <td>46</td>
          <td>47</td>
        </tr>
      </tbody>
    </table>

    <!-- 数字类ascii码(48-57),特殊字符二ascii码(58-64) -->
    <table width="100%">
      <caption class="tcaption">
        数字类、特殊字符(48-64)
      </caption>
      <tbody>
        <tr>
          <td class="header">字符</td>
          <td>0</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
          <td>:</td>
          <td>;</td>
          <td>&lt;</td>
          <td>=</td>
          <td>&gt;</td>
          <td>?</td>
          <td>@</td>
        </tr>
        <tr>
          <td class="header">ascii码</td>
          <td>48</td>
          <td>49</td>
          <td>50</td>
          <td>51</td>
          <td>52</td>
          <td>53</td>
          <td>54</td>
          <td>55</td>
          <td>56</td>
          <td>57</td>
          <td>58</td>
          <td>59</td>
          <td>60</td>
          <td>61</td>
          <td>62</td>
          <td>63</td>
          <td>64</td>
        </tr>
      </tbody>
    </table>

    <!-- 大写字母类ascii码(65-90) -->
    <table width="100%">
      <caption class="tcaption">
        大写字母类ascii码(65-90)
      </caption>
      <tbody>
        <tr>
          <td class="header">字符</td>
          <td>A</td>
          <td>B</td>
          <td>C</td>
          <td>D</td>
          <td>E</td>
          <td>F</td>
          <td>G</td>
          <td>H</td>
          <td>I</td>
          <td>J</td>
          <td>K</td>
          <td>L</td>
          <td>M</td>
          <td>N</td>
          <td>O</td>
          <td>P</td>
          <td>Q</td>
          <td>R</td>
          <td>S</td>
          <td>T</td>
          <td>U</td>
          <td>V</td>
          <td>W</td>
          <td>X</td>
          <td>Y</td>
          <td>Z</td>
        </tr>
        <tr>
          <td class="header">ascii码</td>
          <td>65</td>
          <td>66</td>
          <td>67</td>
          <td>68</td>
          <td>69</td>
          <td>70</td>
          <td>71</td>
          <td>72</td>
          <td>73</td>
          <td>74</td>
          <td>75</td>
          <td>76</td>
          <td>77</td>
          <td>78</td>
          <td>79</td>
          <td>80</td>
          <td>81</td>
          <td>82</td>
          <td>83</td>
          <td>84</td>
          <td>85</td>
          <td>86</td>
          <td>87</td>
          <td>88</td>
          <td>89</td>
          <td>90</td>
        </tr>
      </tbody>
    </table>

    <!-- 特殊字符三ascii码(91-96) -->
    <table style="width: 50%">
      <caption class="tcaption">
        特殊字符三ascii码(91-96)
      </caption>
      <tbody>
        <tr>
          <td class="header">字符</td>
          <td>[</td>
          <td>/</td>
          <td>]</td>
          <td>^</td>
          <td>_</td>
          <td>、</td>
        </tr>
        <tr>
          <td class="header">ascii码</td>
          <td>91</td>
          <td>92</td>
          <td>93</td>
          <td>94</td>
          <td>95</td>
          <td>96</td>
        </tr>
      </tbody>
    </table>

    <!-- 小写字母类ascii码(97-122) -->
    <table class="table table-bordered tb" width="100%">
      <caption class="tcaption">
        小写字母类ascii码(97-122)
      </caption>
      <tbody>
        <tr>
          <td class="header">字符</td>
          <td>a</td>
          <td>b</td>
          <td>c</td>
          <td>d</td>
          <td>e</td>
          <td>f</td>
          <td>g</td>
          <td>h</td>
          <td>i</td>
          <td>j</td>
          <td>k</td>
          <td>l</td>
          <td>m</td>
          <td>n</td>
          <td>o</td>
          <td>p</td>
          <td>q</td>
          <td>r</td>
          <td>s</td>
          <td>t</td>
          <td>u</td>
          <td>v</td>
          <td>w</td>
          <td>x</td>
          <td>y</td>
          <td>z</td>
        </tr>
        <tr>
          <td class="header">ascii码</td>
          <td>97</td>
          <td>98</td>
          <td>99</td>
          <td>100</td>
          <td>101</td>
          <td>102</td>
          <td>103</td>
          <td>104</td>
          <td>105</td>
          <td>106</td>
          <td>107</td>
          <td>108</td>
          <td>109</td>
          <td>110</td>
          <td>111</td>
          <td>112</td>
          <td>113</td>
          <td>114</td>
          <td>115</td>
          <td>116</td>
          <td>117</td>
          <td>118</td>
          <td>119</td>
          <td>120</td>
          <td>121</td>
          <td>122</td>
        </tr>
      </tbody>
    </table>

    <!-- 特殊字符四ascii码(123-127) -->
    <table style="width: 50%">
      <caption class="tcaption">
        特殊字符四ascii码(123-127)
      </caption>
      <tbody>
        <tr>
          <td class="header">字符</td>
          <td>{</td>
          <td>|</td>
          <td>}</td>
          <td>`</td>
          <td>DEL</td>
        </tr>
        <tr>
          <td class="header">ascii码</td>
          <td>123</td>
          <td>124</td>
          <td>125</td>
          <td>126</td>
          <td>127</td>
        </tr>
      </tbody>
    </table>

    <table width="100%">
      <caption class="tcaption">
        特殊字符解释ascii码(1-31)
      </caption>
      <tbody>
        <tr>
          <td>NUL 空 1</td>
          <td>LF 换行 10</td>
          <td>DC3 设备控制三XOFF 19</td>
          <td>FS 文件分割符 28</td>
        </tr>
        <tr>
          <td>STX 正文开始 2</td>
          <td>VT 垂直制表 11</td>
          <td>DC4 设备控制四 20</td>
          <td>GS 组群分隔符 29</td>
        </tr>
        <tr>
          <td>ETX 正文结束 3</td>
          <td>FF 换页键 12</td>
          <td>NAK 空转同步 21</td>
          <td>RS 记录分隔符 30</td>
        </tr>
        <tr>
          <td>EOY 传输结束 4</td>
          <td>CR 归位键 13</td>
          <td>SYN 同步用暂停 22</td>
          <td>US 单元分隔符 31</td>
        </tr>
        <tr>
          <td>ENQ 询问字符 5</td>
          <td>SO 取消变换（Shift out） 14</td>
          <td>TB 区块传输结束 23</td>
        </tr>
        <tr>
          <td>ACK 承认 6</td>
          <td>SI 启用变换（Shift in） 15</td>
          <td>CAN 取消 24</td>
        </tr>
        <tr>
          <td>BEL 报警 7</td>
          <td>DLE 跳出数据通讯 16</td>
          <td>EM 连接介质中断 25</td>
        </tr>
        <tr>
          <td>BS 退一格 8</td>
          <td>DC1 设备控制一XON 17</td>
          <td>SUB 替换 26</td>
        </tr>
        <tr>
          <td>HT 横向列表 9</td>
          <td>DC2 设备控制二 18</td>
          <td>ESC 跳出 27</td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      charText1: '',
      asciiText1: '',
      charText2: '',
      asciiText2: '',
      errorText: ''
    }
  },
  watch: {
    charText1: {
      handler(newValue, oldValue) {
        const text = newValue.trim()
        const ascii = text ? text.charCodeAt(0) : ''
        if (ascii === 0 || ascii === '') {
          this.charText1 = ''
          this.asciiText1 = ''
        } else {
          this.asciiText1 = ascii
          console.log(
            `watch charText,${text},${text.length},`,
            this.asciiText1
          )
        }
        this.errorText = ''
      }
    },
    asciiText2: {
      handler(newValue, oldValue) {
        if (newValue === '') {
          return
        }

        if (typeof newValue !== 'number' || newValue < 32 || newValue > 126) {
          // this.errorText = '请输入非特殊ascii码 （32~127）'
          this.charText2 = 'NaN?'
          return
        }
        // this.errorText = ''
        const charText = String.fromCharCode(newValue)
        this.charText2 = charText
        console.log('watch asciiText', newValue, newValue.length, charText)
      }
    }
  },
  methods: {},
  mounted() {
    this.$refs.inputText.focus()
  }
}
</script>
<style lang="less" scoped>
.convert-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  .second-input {
    margin-left: 100px;
  }

  input {
    padding: 10px;
    width: 50px;
    font-size: 15px;
    outline: none;
    border: 2px solid #e3dddd;
  }

  input:focus {
    outline: none;
    border: 2px solid var(--primary-color);
  }
  .result {
    padding: 10px;
    width: 50px;
    font-size: 15px;
  }
  .input-arrow {
    color: var(--primary-color);
  }
}

caption {
  display: table-caption;
  text-align: -webkit-center;
  font-size: 16px;
  padding-top: 20px;
  color: #777;
  text-align: left !important;
}
table {
  width: 100%;
  max-width: 100%;
  border: 1px solid #ddd;
  background-color: transparent;
  border-spacing: 0;
  border-collapse: collapse;
}

td {
  padding: 6px 3px;
  border: 1px solid #ddd;
  display: table-cell;
  text-align: center;
}
.header {
  width: 50px;
}
</style>
