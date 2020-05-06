<template>
	<div class="process">
		<!-- <progress max="100" :value="progressValue"></progress> -->
		<div v-if="progressValue">
			<div class="name">1、{{progressValue.name1}}</div>
			<div class="name">2、{{progressValue.name2}}</div>
			<div class="name">3、数量：{{progressValue.number}} 个 &nbsp; &nbsp; &nbsp;单价：7.5 元</div>
			<div class="name">4、{{progressValue.number * 7.5}} 元</div>
		</div>
		<div v-else>暂无数据</div>
		<div id="mask" v-if="maskShow">
			<div class="spinner">
				<div class="bounce1"></div>
				<div class="bounce2"></div>
				<div class="bounce3"></div>
			</div>
			<br/>
			<div class="masktext">服务器走丢了，正在连接...</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				progressValue: {}, // 进度值
				maskShow:false
			}
		},
		//（socket.on）绑定事件放在sockets中
		sockets: {
			// 创建连接
			connect() {
				console.log('connect success');
				this.maskShow= false
			},
			// 监听自定义progress事件，需与服务端emit事件名一致
			progress(res) {
				if (res != '{}') {
					this.progressValue = res;
					console.log('服务器数据', res);
					localStorage.setItem('progressVal', JSON.stringify(res))
				} else {
					let progressVal = JSON.parse(localStorage.getItem('progressVal'));
					console.log('缓存数据', progressVal)
					this.progressValue = progressVal
				}
			},
			disconnect() {
				this.maskShow =true
				//断开重新连接
				setInterval(() => {
					this.$socket.connect();
				}, 300)
			}
		}
	}
</script>
<style scoped>
	.process {
		text-align: center;
	}

	progress {
		width: 168px;
		height: 5px;
		color: #f00;
		background: #EFEFF4;
		border-radius: 0.1rem;
	}

	/* 表示总长度背景色 */
	progress::-webkit-progress-bar {
		background-color: #f2f2f2;
		border-radius: 0.2rem;
	}

	/* 表示已完成进度背景色 */
	progress::-webkit-progress-value {
		background: #ff6464;
		border-radius: 0.2rem;
	}

	progress::-moz-progress-bar {
		background-color: #f2f2f2;
		border-radius: 0.2rem;
	}
	.spinner>div {
		width: 30px;
		height: 30px;
		background-color: #F1F1F1;
		border-radius: 100%;
		display: inline-block;
		-webkit-animation: bouncedelay 1.4s infinite ease-in-out;
		animation: bouncedelay 1.4s infinite ease-in-out;
		/* Prevent first frame from flickering when animation starts */
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	
	.spinner .bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}
	
	.spinner .bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}
	
	#mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 999999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#mask .masktext{
		color: white;
	}
	@-webkit-keyframes bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0.0)
		}
		40% {
			-webkit-transform: scale(1.0)
		}
	}
	
	@keyframes bouncedelay {
		0%,
		80%,
		100% {
			transform: scale(0.0);
			-webkit-transform: scale(0.0);
		}
		40% {
			transform: scale(1.0);
			-webkit-transform: scale(1.0);
		}
	}
</style>
