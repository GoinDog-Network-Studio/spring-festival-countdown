// 获取页面上的两个元素，一个用于显示倒计时（counter），另一个用于显示进度百分比（percent）
let counter = document.getElementById("counter");
let percent = document.getElementById("percent");

// 定义update函数，用于更新倒计时和进度百分比
function update() {
    const festival = "春节";
    // 创建一个新的Date对象，表示当前时间
    let date = new Date();
    let past_time = new Date(2025, 0, 29);
    let future_time = new Date(2026, 1, 17);
// 设置过去的时间戳（2024年3月10日）和未来的时间戳（2025年2月29日）
    let past_timestamp = past_time.getTime();
    let future_timestamp = future_time.getTime();
    // 计算距离下个月的第10天的天数
    // 当前日期到月底的天数加上下个月10号的天数
    let day_in_current_month = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let day_counter = (() => {
        let result = day_in_current_month - date.getDate();
        for (let origin_year = date.getFullYear(); origin_year < future_time.getFullYear(); origin_year++) {
            for (let origin_month = 0; origin_month < future_time.getMonth(); origin_month++) {
                let delta_date = ((year, month) => {
                    return new Date(year, month + 1, 0).getDate();
                })(origin_year, origin_month);
                result += delta_date;
            }
        }
        result += future_time.getDate();
        return result
    })();

    // 计算当前小时到23点的小时数
    let hour_counter = 23 - date.getHours();
    // 如果小时数是一位数，则在前面补0
    if (hour_counter.toString().length != 2) hour_counter = "0" + hour_counter;

    // 计算当前分钟到59分的分钟数
    let minute_counter = 59 - date.getMinutes();
    // 如果分钟数是一位数，则在前面补0
    if (minute_counter.toString().length != 2) minute_counter = "0" + minute_counter;

    // 计算当前秒到59秒的秒数
    let second_counter = 59 - date.getSeconds();
    // 如果秒数是一位数，则在前面补0
    if (second_counter.toString().length != 2) second_counter = "0" + second_counter;

    // 构造倒计时的字符串
    let innerHtml = `${day_counter}天${hour_counter}时${minute_counter}分${second_counter}秒`;
    // 将倒计时字符串设置到counter元素的innerText中
    counter.innerText = innerHtml;

    
    // 获取当前时间的时间戳
    let now_timestamp = date.getTime();

    // 计算当前时间戳在过去和未来时间戳之间的百分比
    let percent_num = (now_timestamp - past_timestamp) / (future_timestamp - past_timestamp);
    // 将百分比转换为字符串，并保留最多9位小数，然后设置到percent元素的innerText中
    percent.innerText = (percent_num * 100).toString().substring(0, 9) + "%";
    let ice = document.getElementById("IceLiu_Forward");
    ice.style.height = `${(1 - percent_num)*100}%`;
    ice.style.top = `${percent_num*100}%`

    let date_document = document.getElementById("date");
    date_document.innerText = `${future_time.getFullYear()}年${future_time.getMonth() + 1}月${future_time.getDate()}日(${festival})`
}


// 创建一个audio元素用于播放背景音乐
let background_music = document.createElement("video");
// 设置音频文件的路径
background_music.src = "./src/media/background.mp3";
// 设置音频循环播放
background_music.setAttribute("loop", "true");
// 隐藏音频元素
background_music.style.display="none";
// 添加按钮点击事件监听，之后播放音乐
document.getElementById("start").addEventListener("click", e => {
    document.getElementById("window").style.animation = "hidden 0.2s ease-in 0s 1 normal forwards";
    setTimeout(() => {
        document.getElementById("window").style.display = "none"
    }, 2000)
    background_music.play();
    // 使用setInterval每隔1000毫秒（1秒）调用一次update函数，以更新倒计时和进度百分比
    setInterval(update, 1000);
})