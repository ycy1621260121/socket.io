<template>
	<div class="process">
		<!-- <progress max="100" :value="progressValue"></progress> -->
		<div>{{progressValue}}</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				progressValue: '', // 进度值
			}
		},
		//（socket.on）绑定事件放在sockets中
		sockets: {
			// 创建连接
			connect() {
				console.log('连接成功啦')
			},
			// 监听自定义progress事件，需与服务端emit事件名一致
			progress(res) {
				this.progressValue = res;
				console.log('服务器数据', res);
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
</style>
