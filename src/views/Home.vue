<template lang='pug'>
#Dashboard.main-page.detail-page.pb-0
	v-row#page-head.d-flex.align-center.justify-md-space-between
		v-col.d-flex.align-center.px-0.pb-0.px-md-2.pb-md-4(cols='12' md='3')
			h1.my-0 Dashboard
		v-col(cols='12' md='9')
			v-row(no-gutters)
				v-col.pl-3
					v-select(v-model='process' :items='processGroup' item-value='index' item-text='groupName' prepend-inner-icon='icon-step' height='36' flat dense solo)
				v-col.pl-3
					v-select(v-model='people' :items='peoples' item-value='index' item-text='name' prepend-inner-icon='icon-group' height='36' flat dense solo)
	#page-inner
		v-row
			v-col(cols='12' md='5')
				v-card.px-2.py-5(flat)
					v-row.align-center
						v-col(cols='9')
							h3.mb-0.d-flex.align-center
								.cube-icon.small.bg-primary.mr-3
									v-icon(size='19' color='white') icon-chart
								span Cumulative Revenue Forecast
						v-col.text-right(cols='3')
							v-tooltip(bottom)
								template(v-slot:activator='{ on, attrs }')
									v-btn.ml-auto(color='gary' outlined icon to='/Dashboard' v-bind='attrs' v-on='on')
										v-icon(size='20') icon-edit
							v-tooltip(bottom)
								template(v-slot:activator='{ on, attrs }')
									v-btn.ml-4(color='gary' outlined icon to='/Deals' v-bind='attrs' v-on='on')
										v-icon(size='20') icon-chatmoney-border
								span GO Deals
						v-col(cols='6')
							.text-caption Current Status
							.text-h5.mt-1 $1.31M
						v-col(cols='6')
							.text-caption End of the period
							.text-h5.mt-1 $2.18M
						v-col(cols='12')
							year-bar-chart(v-if='selectDateMode === 1 || selectDateMode === 4' :chart-data="chartData" :options='options')
							week-bar-chart(v-if='selectDateMode === 3' :chart-data="weekChartData" :options='options')
							quarter-bar-chart(v-if='selectDateMode === 2' :chart-data="quarterChartData" :options='options')
			v-col.pt-7(cols='12' md='7')
				.d-flex.align-center.justify-space-between.mb-2.px-2
					h3.mb-0.d-flex.align-center
						.cube-icon.small.bg-purple.mr-3
							v-icon(size='22' color='white') mdi mdi-earth
						span News
					v-row
						v-col.text-right.pr-0(cols='2' offset='10')
							v-btn.ml-auto(icon outlined color='gary' @click='carousel--')
								v-icon(size='14') icon-arrow-left
							v-btn.ml-4(icon outlined color='gary' @click='carousel++')
								v-icon(size='14') icon-arrow-right
				v-carousel(v-model='carousel' height='420' hide-delimiters :show-arrows='false')
					v-carousel-item
						v-row(no-gutters)
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://ec.ltn.com.tw/article/breakingnews/3730352' target='_blank')
									img(src='https://img.ltn.com.tw/Upload/business/page/800/2021/11/09/phpnbPDKd.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 超微贏得Meta元宇宙訂單 帶動台積電ADR大漲
										v-card-text.pa-0.mb-2 元宇宙題材熱度持續發燒，美國半導體大廠超微（AMD）8日宣布贏得元宇宙客戶Meta訂單，更名為Meta的臉書將成為超微的數據中心客戶，利多消息激勵超微股價應聲大漲逾10％，超微相關產品由台積電以7奈米先進製程代工生產，台積電ADR也上漲達2.64%。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://finance.technews.tw/2021/11/09/musk-rushes-to-sell-tesla-shares/' target='_blank')
									img(src='https://img.technews.tw/wp-content/uploads/2018/10/25150725/Elon-Musk1.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 馬斯克急賣 10% 特斯拉持股，真實原因：為繳天價稅單
										v-card-text.pa-0.mb-2 特斯拉（Tesla）執行長馬斯克（Elon Musk）日前在 Twitter 辦投票，結果出爐，近六成網友支持他賣掉 10% 特斯拉持股，馬斯克也同意履行投票結果。受馬斯克減持消息影響，8 日特斯拉股價跳水大跌 4.8%，回測 10 日均線。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://news.ltn.com.tw/news/world/breakingnews/3730597' target='_blank')
									img(src='https://img.ltn.com.tw/Upload/news/600/2021/11/09/phpwY5s6p.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 武肺口服藥將問世 專家：無法取代疫苗
										v-card-text.pa-0.mb-2 美國藥廠默沙東（Merck）和輝瑞（Pfizer）研發的武漢肺炎（新型冠狀病毒病，COVID-19）口服抗病毒藥研究顯示，如果能在確診初期服用，可以顯著減輕降低武肺重症風險，但多位醫師警告對疫苗猶豫不決的人，不要將藥物療法的益處與疫苗的預防效果混淆。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://news.ltn.com.tw/news/world/breakingnews/3730597' target='_blank')
									img(src='https://img.ltn.com.tw/Upload/news/600/2021/11/09/phpwY5s6p.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 武肺口服藥將問世 專家：無法取代疫苗
										v-card-text.pa-0.mb-2 美國藥廠默沙東（Merck）和輝瑞（Pfizer）研發的武漢肺炎（新型冠狀病毒病，COVID-19）口服抗病毒藥研究顯示，如果能在確診初期服用，可以顯著減輕降低武肺重症風險，但多位醫師警告對疫苗猶豫不決的人，不要將藥物療法的益處與疫苗的預防效果混淆。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://ec.ltn.com.tw/article/breakingnews/3730352' target='_blank')
									img(src='https://img.ltn.com.tw/Upload/business/page/800/2021/11/09/phpnbPDKd.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 超微贏得Meta元宇宙訂單 帶動台積電ADR大漲
										v-card-text.pa-0.mb-2 元宇宙題材熱度持續發燒，美國半導體大廠超微（AMD）8日宣布贏得元宇宙客戶Meta訂單，更名為Meta的臉書將成為超微的數據中心客戶，利多消息激勵超微股價應聲大漲逾10％，超微相關產品由台積電以7奈米先進製程代工生產，台積電ADR也上漲達2.64%。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://finance.technews.tw/2021/11/09/musk-rushes-to-sell-tesla-shares/' target='_blank')
									img(src='https://img.technews.tw/wp-content/uploads/2018/10/25150725/Elon-Musk1.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 馬斯克急賣 10% 特斯拉持股，真實原因：為繳天價稅單
										v-card-text.pa-0.mb-2 特斯拉（Tesla）執行長馬斯克（Elon Musk）日前在 Twitter 辦投票，結果出爐，近六成網友支持他賣掉 10% 特斯拉持股，馬斯克也同意履行投票結果。受馬斯克減持消息影響，8 日特斯拉股價跳水大跌 4.8%，回測 10 日均線。
										.new-time 2021/10/10
					v-carousel-item
						v-row(no-gutters)
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://ec.ltn.com.tw/article/breakingnews/3730352' target='_blank')
									img(src='https://img.ltn.com.tw/Upload/business/page/800/2021/11/09/phpnbPDKd.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 超微贏得Meta元宇宙訂單 帶動台積電ADR大漲
										v-card-text.pa-0.mb-2 元宇宙題材熱度持續發燒，美國半導體大廠超微（AMD）8日宣布贏得元宇宙客戶Meta訂單，更名為Meta的臉書將成為超微的數據中心客戶，利多消息激勵超微股價應聲大漲逾10％，超微相關產品由台積電以7奈米先進製程代工生產，台積電ADR也上漲達2.64%。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://finance.technews.tw/2021/11/09/musk-rushes-to-sell-tesla-shares/' target='_blank')
									img(src='https://img.technews.tw/wp-content/uploads/2018/10/25150725/Elon-Musk1.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 馬斯克急賣 10% 特斯拉持股，真實原因：為繳天價稅單
										v-card-text.pa-0.mb-2 特斯拉（Tesla）執行長馬斯克（Elon Musk）日前在 Twitter 辦投票，結果出爐，近六成網友支持他賣掉 10% 特斯拉持股，馬斯克也同意履行投票結果。受馬斯克減持消息影響，8 日特斯拉股價跳水大跌 4.8%，回測 10 日均線。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://news.ltn.com.tw/news/world/breakingnews/3730597' target='_blank')
									img(src='https://img.ltn.com.tw/Upload/news/600/2021/11/09/phpwY5s6p.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 武肺口服藥將問世 專家：無法取代疫苗
										v-card-text.pa-0.mb-2 美國藥廠默沙東（Merck）和輝瑞（Pfizer）研發的武漢肺炎（新型冠狀病毒病，COVID-19）口服抗病毒藥研究顯示，如果能在確診初期服用，可以顯著減輕降低武肺重症風險，但多位醫師警告對疫苗猶豫不決的人，不要將藥物療法的益處與疫苗的預防效果混淆。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://news.ltn.com.tw/news/world/breakingnews/3730597' target='_blank')
									img(src='https://img.ltn.com.tw/Upload/news/600/2021/11/09/phpwY5s6p.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 武肺口服藥將問世 專家：無法取代疫苗
										v-card-text.pa-0.mb-2 美國藥廠默沙東（Merck）和輝瑞（Pfizer）研發的武漢肺炎（新型冠狀病毒病，COVID-19）口服抗病毒藥研究顯示，如果能在確診初期服用，可以顯著減輕降低武肺重症風險，但多位醫師警告對疫苗猶豫不決的人，不要將藥物療法的益處與疫苗的預防效果混淆。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://ec.ltn.com.tw/article/breakingnews/3730352' target='_blank')
									img(src='https://img.ltn.com.tw/Upload/business/page/800/2021/11/09/phpnbPDKd.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 超微贏得Meta元宇宙訂單 帶動台積電ADR大漲
										v-card-text.pa-0.mb-2 元宇宙題材熱度持續發燒，美國半導體大廠超微（AMD）8日宣布贏得元宇宙客戶Meta訂單，更名為Meta的臉書將成為超微的數據中心客戶，利多消息激勵超微股價應聲大漲逾10％，超微相關產品由台積電以7奈米先進製程代工生產，台積電ADR也上漲達2.64%。
										.new-time 2021/10/10
							v-col.pa-2(cols='4')
								v-card.home-new-card.d-inline-block(href='https://finance.technews.tw/2021/11/09/musk-rushes-to-sell-tesla-shares/' target='_blank')
									img(src='https://img.technews.tw/wp-content/uploads/2018/10/25150725/Elon-Musk1.jpg' width='100%')
									.hover-text.text--primary.pa-4
										v-card-title.pa-0.pb-2 馬斯克急賣 10% 特斯拉持股，真實原因：為繳天價稅單
										v-card-text.pa-0.mb-2 特斯拉（Tesla）執行長馬斯克（Elon Musk）日前在 Twitter 辦投票，結果出爐，近六成網友支持他賣掉 10% 特斯拉持股，馬斯克也同意履行投票結果。受馬斯克減持消息影響，8 日特斯拉股價跳水大跌 4.8%，回測 10 日均線。
										.new-time 2021/10/10
		v-row
			v-col(cols='12' md='4')
				v-card.px-2.py-5(flat)
					v-row.align-center
						v-col(cols='10')
							h3.mb-0.d-flex.align-center
								.cube-icon.small.bg-og.mr-3
									v-icon(size='19' color='white') icon-money
								span Recent Opportunities
					v-row
						v-col.pa-2(cols='12' xl='6' v-for='dealsItem, index in deals' :key='index')
							v-card.deals-item.pa-0(flat outlined @click='showToDealDialog()')
								v-card-title.d-flex.align-center.justify-space-between.px-4.pt-2.pb-0
									h5.ellipsis {{ dealsItem.deal_name }}
									v-btn(width='14' height='14' :color='getStatusColor(dealsItem.eventStatus)' fab depressed)
								v-card-text.pa-0
									p.mt-1.mb-0.px-4 {{ dealsItem.client }}
									v-row.d-flex.align-center(no-gutters='no-gutters')
										v-col.pl-4(cols='9')
											span $ {{ amountFormat(dealsItem.amount) }}
										v-col.text-right.pr-3(cols='3')
											v-avatar(color='aliceBlue' size='28')
												span(v-if="dealsItem.ownerPic === ''") {{ dealsItem.ownerNickName }}
												img(v-else :src='dealsItem.ownerPic' :alt='dealsItem.ownerName')
									v-progress-linear.mt-2(:value='dealsItem.progress.value' :color='dealsItem.progress.color')
			v-col(cols='12' md='4')
				v-card.px-2.pt-5.pb-8(flat)
					v-row.align-center.mb-2
						v-col(cols='10')
							h3.mb-0.d-flex.align-center
								.cube-icon.small.bg-pink.mr-3
									v-icon(size='19' color='white') icon-companies-b
								span Recent Accounts
					v-card-text.pa-0
						v-row
							v-col.pb-0(cols='12' xl='6' v-for='(item, index) in accountList' :key='index')
								v-card.deals-item.px-4.py-0(flat outlined)
									v-list-item.pa-0
										v-list-item-avatar.ma-0.mr-3(color='blue-grey lighten-5' size='40' onclick="location.href='/Account';")
											span.mx-auto(v-if="item.logo === ''") {{ item.nickName }}
											img(v-else :src='item.logo' :alt='item.name')
										v-list-item-content.border-bottom
											v-list-item-title.d-flex.justify-space-between.align-center.mb-3
												a.t-black.text-subtitle-2.mb-0(href='/Account') {{ item.name }}
												span.job-label  {{ item.job }}
											v-list-item-subtitle
												p.mb-2
													v-icon.mr-1(size='14' color='gary') icon-cell
													a.t-black(:href='onCall(item.cell)') {{ item.cell }}
												p.mb-2
													v-icon.mr-1(size='18' color='gary') mdi mdi-earth
													a.t-black(:href='item.web' target='_blank') {{ item.web }}
			v-col(cols='12' md='4')
				v-card.px-2.pt-5.pb-8(flat)
					v-row.align-center.mb-2
						v-col(cols='10')
							h3.mb-0.d-flex.align-center
								.cube-icon.small.bg-gary.mr-3
									v-icon(size='19' color='white') icon-group
								span Recent Contacts
					v-card-text.pa-0
						v-row
							v-col.pb-0(cols='12' xl='6' v-for='(item,index) in contact' :key='index')
								v-card.deals-item.px-4.py-0(flat outlined)
									v-list-item.pa-0
										v-list-item-avatar.ma-0.mr-3(color='blue-grey lighten-5' size='40' onclick="location.href='/Contact';")
											span.mx-auto(v-if="item.pic === ''") {{ item.nickName }}
											img(v-else :src='item.pic' :alt='item.name')
										v-list-item-content.border-bottom
											v-list-item-title.d-flex.justify-space-between.align-center.mb-3
												a.t-black.text-subtitle-2.mb-0(href='/Contact') {{ item.name }}
												span.job-label  {{ item.job }}
											v-list-item-subtitle
												p.mb-2
													v-icon.mr-1(size='14' color='gary') icon-cell
													a.t-black(:href='onCall(item.phone)') {{ item.phone }}
												p.mb-2
													v-icon.mr-1(size='14' color='gary') icon-mail
													a.t-black(:href='onMall(item.email)') {{ item.email }}
	v-dialog(v-model='toDealDialog' max-width='1200' persistent)
		to-deal(@emitToDealDialog='onEmitToDealDialog')
</template>

<script>
import yearBarChart from '../assets/script/barChart';
import weekBarChart from '../assets/script/barChart';
import quarterBarChart from '../assets/script/barChart';
import toDeal from '@/components/Dialog/Deal/toDeal';

export default {
	name: 'Dashboard',
	components: {
		yearBarChart,
		weekBarChart,
		quarterBarChart,
		toDeal
	},
	data() {
		return {
			date: '',
			carousel: 0,
			panels: [0],
			startDayMenu: false,
			startDay: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
			endDayMenu: false,
			endDay: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
			selectDateMode: 1,
			dateMode: [
				{ index: 1, name: 'This Year' },
				{ index: 2, name: 'This quarter' },
				{ index: 3, name: 'This week' },
				{ index: 4, name: 'Select Date' }
			],
			process: 1,
			processGroup: [
				{ index: 1, groupName: 'Pipeline' }
			],
			people: 1,
			peoples: [
				{ index: 1, name: 'everyone' }
			],
			chartData: {
				labels: ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
				datasets: [
					{
						label: 'Won Deals',
						data: [2,5,4,6,7,8,9,10,14,20,12,10],
						backgroundColor: 'rgb(0, 170, 96)',
						stack: 'Stack 0',
					},
					{
						label: 'Open Deals',
						data: [0,0,0,0,0,8,9,10,14,20,12,10],
						backgroundColor: 'rgb(80, 140, 242)',
						stack: 'Stack 0',
					}
				]
			},
			quarterChartData: {
				labels: ['Jan', 'Feb','Mar'],
				datasets: [
					{
						label: 'Won Deals',
						data: [2,5,4],
						backgroundColor: 'rgb(0, 170, 96)',
						stack: 'Stack 0',
					},
					{
						label: 'Open Deals',
						data: [0,0,0],
						backgroundColor: 'rgb(80, 140, 242)',
						stack: 'Stack 0',
					}
				]
			},
			weekChartData: {
				labels: ['Sunday','Monday', 'Tuesday','Wednesday', 'Thursday','Friday','Saturday'],
				datasets: [
					{
						label: 'Won Deals',
						data: [2,5,4,3,6,8,4],
						backgroundColor: 'rgb(0, 170, 96)',
						stack: 'Stack 0',
					},
					{
						label: 'Open Deals',
						data: [0,0,0,2,5,3,2],
						backgroundColor: 'rgb(80, 140, 242)',
						stack: 'Stack 0',
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							// Include a dollar sign in the ticks
							callback: function(value) {
								return '$' + value;
							}
						}
					}]
				}
			},
			toDealDialog: false,
			deals: [
				{
					eventStatus: 1,
					deal_name: 'Bag End deal',
					client: 'Bag end',
					amount: 50000,
					ownerName: 'James Campbell',
					ownerNickName: 'JC',
					ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
					finishDate: '2021/07/17',
					progress: {
						currentName: 'Lead In',
						color: 'primary',
						value: 20,
					}
				},
				{
					eventStatus: 2,
					deal_name: 'Shady Acres deal',
					client: 'Shady Acres',
					amount: 12000,
					ownerName: 'James Campbell',
					ownerNickName: 'JC',
					ownerPic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=707b9c33066bf8808c934c8ab394dff6',
					finishDate: '2021/07/16',
					progress: {
						currentName: 'Contact Made',
						color: 'orange',
						value: 40,
					}
				},
				{
					eventStatus: 3,
					deal_name: 'Coke Deal',
					client: 'Coke',
					amount: 50000,
					ownerName: 'James Campbell',
					ownerNickName: 'JC',
					ownerPic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
					finishDate: '2021/07/16',
					progress: {
						currentName: 'Proposal Made',
						color: 'purple',
						value: 80,
					}
				},
				{
					eventStatus: 3,
					deal_name: 'Coke Deal',
					client: 'Coke',
					amount: 50000,
					ownerName: 'James Campbell',
					ownerNickName: 'JC',
					ownerPic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
					finishDate: '2021/07/16',
					progress: {
						currentName: 'Proposal Made',
						color: 'purple',
						value: 80,
					}
				},
			],
			contact: [
				{
					name: 'Andy Wu',
					nickName: 'AW',
					job: 'CEO',
					main: true,
					pic: 'https://cdn.vuetifyjs.com/images/john.jpg',
					phone: '0900-000-000',
					email: 'key000@gmail.com',
					company: '',
				},
				{
					name: 'Sunny Chen',
					nickName: 'KC',
					job: 'CEO',
					main: true,
					pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=707b9c33066bf8808c934c8ab394dff6',
					phone: '0900-000-000',
					email: 'key000@gmail.com',
					company: '',
				},
				{
					name: 'Mandy Wang',
					nickName: 'ML',
					job: 'CEO',
					main: true,
					pic: 'data:image/jpeg;base64,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',
					phone: '0900-000-000',
					email: 'key000@gmail.com',
					company: '',
				},
				{
					name: 'Andy Wu',
					nickName: 'AW',
					job: 'CEO',
					main: true,
					pic: 'https://cdn.vuetifyjs.com/images/john.jpg',
					phone: '0900-000-000',
					email: 'key000@gmail.com',
					company: '',
				},
			],
			accountList: [
				{
					idx: 1,
					name: '鉅碩資產',
					logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxETEhIQExIWFRUVERcXGBgXFxYaFxUXFhIWFx4XFxoYHSggHRomGxcVITEhJSkrLi4uFx8zODMuQygtMSsBCgoKDg0OGxAQGzEmICYrLzAuNzc4LSsuNi4tLTYtLS0rLS83LS4tLzItLS0vKy8tLS0tLTUtLS8tLzUvLy0vLv/AABEIAH4AjAMBEQACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAABgIFAQMEB//EAD8QAAECAgUFCwsEAwAAAAAAAAEAAgMRBAUGITESQVFx0RMiMkNhcoGCkbHCMzRSU3ODkqGissEWQmLhFCNj/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAUBAwQGAv/EADIRAAEDAgIGCQUBAQEAAAAAAAABAgMEBRExEiEzQYHBEzJRUmFxkaGxFBUiQtHw4SP/2gAMAwEAAhEDEQA/APcUACABAAgDhrCtoMHhuv8ARF7j0ZulZpquKLrLr7DRDSyzdVNXbuF6l2uebobA0aXXnsFw+aVy3SReomHuNI7U1OuuJVRq7pLsYrhzd79sljfVTOzcvwa20cDcmp8/JpNNinGI89Z21Z1e5c1LEhjTJqehJlOijCK/4nbUI9yZKQsMa5tT0Q64Fd0huEQnnSPfermVk7cnL8/JS+jhdm3kWlEtU7CIwHlbd8jtWyK7PTrpj7GOS2J+i+pfUKsoUXgOv0G4joTWCsim1NXX2bxdLTyRdZDrWooBAAgAQAIAEACABAEYjw0FxIAAmSbgAvLnI1MVyJRquXBBPrq1LnTZAuGBfnPN0Dlx1JLU3Bzvxj1J7jyltqN/KXWvZ/e34FsuJMyZk5ylg1RMEwQyFBBkKCDYxhOAJ1BQQqomZIsIxBGsKFPOKLkAXkCQUEE2OIMwZEZwoIVMdSjFVFoSJMjGYzPzjnadabUlzc1dGXWnbv8A+/IrqaBF/KP0/gzNIN4vBXQIqOTFBSqYalMqSAQAIAEACAIxHhoLiZACZJwAGdeXORqYrkS1FcuCCBaCvHR3ZLZiEDcPS5TsXP1dUsy4JkdLR0aQJivWKcLEbTfRKM+I4MY0uJzD86AvTGOeuDUxUrkkbG3ScuCDTV1kgJGM6Z9FuHSdiaQ2vfIvBP6KJ7ouUacV/hfUarIMOWTDaJZ5TPab0xZSQsyanyLn1Mr+s5TrV6IiZFAIVEXMDkpNWQX8KG08oEj2i9ZpKKB+bfTUXsqZWdVylHT7L54Tp/xd+Dt7UrntTk1xLj4bxhDcsdUicRfiwnNJa4EEZilDmq1cFTWM2uRyYtXUYC8EjVZV8UsIPkxwScZ5wORPbQ6XBUXq8/ATXFI9JMOtvL5OxaCABAAgAQAmWyreZ/x2G4cM6T6PR36kluFRpO6NuSZ+Y9tlLop0rs1y/orhLBud9U1a+O/IbcBwnZmjbyKyGB0ztFpnqKhsDNJ3A9Bq2rocFuQwaycXHSSuigp2QtwaczPUPmdpOOtXlIIAEACABAAgDjrGrmRmycL8zhiP65FkqqNk6a8+0vgqHwri3IoqDZx26HdOA05v36tA0pPBa5HSKkmpE9/IZTXBuh+Ga+wzsYAAAJACQAzLoWMaxqNamoTqqquKkl6IBAAgAQBxVzThBgviZwJN5XG4behUVMvRRq7fuNFLD00qM9fI8wc4kkkzJMydJK5pTrERETBDbRoLnuaxomXEADlKEarlwQ8vejGq52SHpVU1c2BDDG44uPpO0rpKaBIWaKZ7zlamodO/SXgdq0GcEACABAAgAQAIAEACABAAgAQAIAEAJtvaXfDgjMC89Nw7ndqT3KTFyM7B7aItTpOAqBKxwNdhqDNz45HB3rdZF57JfEmVtixcr13Ce6zYNSNN+tf9/shyToRAgAQAIAEACABAAgAQBGI8NBJIAGJOAXh72sbpOXBCWtVy4IUlKtLDBkxpfym4dGdKJrw1NUbcfMYR25663Lh7nIbTRMzGy6dqy/eJuxPf+l/26PtU6qNaVpMnsI5QZ/JXRXnXhI30/n/Sl9uVOqpdQIzXgOaQQdCcxTMlbpMXFBe9jmLg5DYrTyebWojZVKinQQ34QB3zXOVbtKZy+PxqOqoGaNO319SrCzGs9Js1R8ijQhnLco9a/uIXQ0LNGFPHWcrXSac7vDV6GLS0p8KAXsdkuymicgcTyrzXyOjixauGsmhibJLovTFMBRFoqV60/CzYk31k/eUd/QU/d+SQtDSvW/SzYo+sn7ykfQU/d+TP6hpXrfpZsUfWT95SPoKfu/JIWgpXrfpZsUfWz95SPoafu/JkWgpXrfpZsUfWz95SPoYO78khX9J9Z9LNij62fvKH0MHd+TIr6k+s+lmxH1tR31I+hg7vyM1R01zoBiRHTkXTNwuGpOaGoVYFklXJVFNXCjZdBiC5XFaujOkLmA3DTynl7kkq6t1Q7w3INaambC3x3nAFjNBuZR3kZQY4jTIy7VOiuGOB4V7UXBV1kAvBJ21ZTnQngjA8IaRtV9NUvp36TePiUTwpK3Bc9w6MeCAReCJjUV2THo9qObkogVFRcFPLq3M48Y/9n/eVzMq4vcvip19PqhZ5J8HKFWWnq9CbKHDGhjR2NC6iFMI2p4IcdKuMjl8VKq2Hmzuc3vWK57HibLbt08lEMJCdESCggyFBBILyQSCggkFBBIKCBvs9R2xKMWOEwXmfaDmT6ghbLSqx2WIkrZHR1Gk3PArqys89k3Q9+3R+4behYam2yRfkzWnuaoK9j9T9S+x12fqcECLEE58Fp7yFdbqBHp0siatyf0prKtUXQYvmMafoiJqQVCzaeiNaWxGiWVMHXp71zd2p2xvR7dWPIb0EquRWLuKQJQMByqJ5MBk80x2OP4XV2p2NMnhj8iGsTCZTzyuWypEcf9n/AHFKZkwkcnip01MuMLPJPg5Aqi49WoD8qFDdphtPa0Lp4Vxjavghx8yaMjk8VKu2Hmzuc3vWO57Hia7bt08lEMJCdEXNlqMyJGyXtDhkEyOmYWuhibJLovTFMDDXyOjixauC4nZa2hQ4e5bmwNnlTlnlk7SrLjBHErdBMMyi3TPk0tNccuYvhLBkMdkaLDfuuWxrpZMpgGU8rBM7bDHKrtNMchXcpXs0dFcM+RptRR2MitDGhoMMGQ05TlTcYmRSojEwTAst8jnxKrlx1/wqAl5tHSyvkBz3fhdHathxUQ3DbcC4TMwggAQAq2kpge8MGDJz5xx7Jd65e6VKSy6Lcm/O8c0MKsZpLvKgJWbh2qqAWQmNOMpnWTOXzXX2+JY6dqLnn6nP1D9OVVQRrXwMmlPOZwa4dkj8wUrrWaMy+p0FtfpU6eGopgshuPRbJ0nLozNLJsPRh8iE/oJNKFE7NRzFxj0J18df+4kLYebO5ze9V3PY8T1bdunkohhIToi+sb5x7t3eFvtu24KLrnseKHfbjiev4Fdds28TNaf34cxXCTDcabE8d1PEnFozfw5ii6/px5Gi2Hlm+yH3OVF22yeXNSy2bJfPkhRhKxgOllfIDnu/C6O1bDiohuG24FwmZhBAFJX1b5E4TDvjifR/tJblX6OMUa6968hhR0un+b8hXXPDcuagq3LcIjhvGn4jsCY26j6d+k7qp7+H9MNZUaDdFuajUuqEwrW6oU2MjAcA5LtTsD0H7kruUWKI9PIcWmbByxrv1p/v9kJYScejDY6sdzimG472JIanDDtw7FtoJ+jkwXJRZcoOkj00zT43jDbDzZ3Ob3rdc9jxFtt26eSiGEhOiL6xvnHu3d4W+27bgouuex4od9uOJ6/gV12zbxM1p/fhzFcJMNxpsTx3U8ScWjN/DmKLr+nHkaLYeWb7Ifc5UXbbJ5c1LLZsl8+SFGErGA6WV8gOe78Lo7VsOKiG4bbgXCZmEpq9rgQxubDvzifR/tJ7hcNDGOPPevZ/34N9JSdIum7L5FQmd5XOjksaoqx0Z08GA3n8DlWujo3VD/BM1MtTUJEniOEKGGgNaJACQC6yONsbUa1MEQRucrlxUmvZ5NVKo7YjHQ3YOBB6fyvEjEe1WrvPccixuRzc0PL6fRHQojoTsWmWsZiNYXMyMVjlau466KVsrEe3eaWqs9jFSq8EWiGE8/7A5vXAOOvStklV0kGg7NFFkdH0VRpt6q48ChCwjEvrG+ce7d3hb7btuCi657Hih3244nr+BXXbNvEzWn9+HMVwkw3GmxPHdTxJxaM38OYouv6ceRoth5Zvsh9zlRdtsnlzUstmyXz5IUYSsYDpZXyA57vwujtWw4qIbhtuBiva4EIbmy95HwDTr5FXcK/o/wDzjz3r2f8AfgmkpOkXSdl8ikXEmZvJXOjrDDUhY1RVroztDBwj+ByrVSUjqh+CZb1M1TUJC3x3DjAgtY0NaJAYBdXFE2JiMYmoQver10nZmxWHkEACAKC1dTbszdGD/YwYek3GWvOOlL66m6Rum3NBlb6vonaDuqvsohhIjoiQXkgkEEF9Y3zj3bu8LfbdtwUXXPY8UO+3HE9fwK67Zt4ma0/vw5iuEmG402J47qeJOLRm/hzFF1/TjyNFsPLN9kPucqLttk8ualls2S+fJCjCVjAuqFXW5QNzYN+Sbzg2ejSVuirnRQdGzNVz/hhlo0ll03ZFU5xJJJmSZknOl6mxERNSGQoIN0KkPaJNe4DQCR3KUc5MlPDo2O1qiKbBTYvrH/E7ajpH9qnjoY+6noSFMi+sf8TtqjpH9qh0MfdT0Jf5kX1j/iO1R0j+1SOhj7qeg8LujnQQAp2ns+STHhC/F7Rn/kOXSEnraPDGSPig5oK7DCORfJeQpBKB0SCCC+sb5x7t3eFvtu24KLrnseKHfbjiev4Fdds28TNaf34cxXCTDcabE8d1PEnFozfw5ii6/px5Gi2Hlm+yH3OVF22yeXNSy2bJfPkhRhKxgSCggkAoILiFZ6OQDvRPMSZjXctzbbUOTHRMLq+JFw1mz9ORtLO07FP2up7PdDz9wi8TP6cjaWdp2KPtVT2e6EfcIvEz+no2lnadij7VU9nugfcIvEz+no2lnadiPtVT2e6EfXxeI0rqxOCABAC/XlmmxSYkOTH4kftdr0HlSyqt6P8Ayj1L7DKluLo00X6090E+l0KJCOTEYWnlwOo4FJpI3Rrg5MB5HKyRMWLiW9jfOPdu7wtlt23BTFc9jxQ77ccT1/ArrtmziZrT+/DmK4SYbjTYnjup4k4tGb+HMUXX9OPI0Ww8s32Q+5you22Ty5qWWzZL58kKMJWMDsoFXRYp3jbvSNzR0q2GnkmXBiYlEtRHEn5L/RsqqpWQt8d8/TmHNH5T+ktzIfydrd7J5CaorHS6k1J/sy0TIxggAQAIAEACABAAgAQBGJDa4ScARoImPmvLmNcmDkxJa5Wrii4HNR6tgsdlshhrpSmLrtWCqjpoo3aTUwUtfUSvboudihx2kq0xoYkQHMJN+EpXi7o7FluMCyRo5NxooahIX68lEtlFcTKYXPYD9XoiYjdZar3wg9zi05WTKU808ZjlTu1Rq1HOXfgI7hO2RURN2JtrepN3iB5fkgNAlKZN5OM+VW1dAs8mljgmB4pq3oWK3DHWToln4DL8kvP8jP5YKYrZCzWus8yV8z9+HkWjQBcLgmDWo1MEQyKuOZlSQCABAAgAQAIA/9k=',
					type: 'Analyst',
					industry: '房地產',
					cell: '02-0000-0000',
					fax: '',
					address: '台北市中正區大有路333號10F',
					own: 'Andy Lu',
					web: 'https://cm2.io/',
					peoples: 50,
				},
				{
					idx: 2,
					name: '可口可樂',
					logo: 'https://www.coke.com.tw/content/dam/brands/tw/coca-cola/image/coke-logo.png',
					type: 'food',
					industry: '食品業',
					cell: '02-0000-0000',
					fax: '',
					address: '台北市中正區大有路333號10F',
					own: 'Andy Lu',
					web: '',
					peoples: 50,
				},
				{
					idx: 2,
					name: '可口可樂',
					logo: 'https://www.coke.com.tw/content/dam/brands/tw/coca-cola/image/coke-logo.png',
					type: 'food',
					industry: '食品業',
					cell: '02-0000-0000',
					fax: '',
					address: '台北市中正區大有路333號10F',
					own: 'Andy Lu',
					web: '',
					peoples: 50,
				},
				{
					idx: 1,
					name: '鉅碩資產',
					logo: 'data:image/jpeg;base64,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',
					type: 'Analyst',
					industry: '房地產',
					cell: '02-0000-0000',
					fax: '',
					address: '台北市中正區大有路333號10F',
					own: 'Andy Lu',
					web: 'https://cm2.io/',
					peoples: 50,
				},
			],
		}
	},
	methods: {
		showToDealDialog() {
			this.toDealDialog = true;
		},
		onEmitToDealDialog() {
			this.toDealDialog = false;
		},
		amountFormat: function (amount) {
			const val = amount.toString();
			return val.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
		},
		getStatusColor: function (eventStatus) {
			let color = '';
			switch (eventStatus) {
				case 1:
					color = 'green';
					break;
				case 2:
					color = 'red';
					break;
				case 3:
					color = 'gary';
					break;
				case 4:
					color = 'orange';
					break;
				default:
					color = 'gary';
					break;
			}
			return color;
		},
		onCall: function (cell) {
            return 'tel:'+cell;
        },
        onMall: function (mail) {
            return 'mailto:'+mail;
        },
	},
}
</script>