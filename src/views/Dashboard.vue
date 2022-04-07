<template lang='pug'>
#Dashboard.main-page.detail-page.pb-0
	v-row#page-head.d-flex.align-center.justify-md-space-between
		v-col.d-flex.align-center.px-0.pb-0.px-md-2.pb-md-4(cols='12' md='3')
			h1.my-0 Dashboard
		v-col(cols='12' md='9')
			v-row(no-gutters)
				v-col.pl-3
					v-select(v-model='selectDateMode' :items='dateMode' item-value='index' item-text='name' prepend-inner-icon='mdi-calendar' height='36' flat dense solo)
				v-col.pl-3(v-if='selectDateMode === 4' cols='4')
					v-row(no-gutters)
						v-col.pr-1(cols='6')
							v-menu(ref='menu' v-model='startDayMenu' return-value.sync='date' transition='scale-transition' offset-y='offset-y' min-width='auto' right)
								template(v-slot:activator='{ on, attrs }')
									v-text-field.no-border(v-model='startDay' label='請選擇開始日期' prepend-inner-icon='mdi-calendar' v-bind='attrs' v-on='on' dense solo)
								v-date-picker(v-model='startDay' no-title='no-title')
									v-spacer
									v-btn(text='text' color='primary' @click='menu = false') 取消
									v-btn(text='text' color='primary' @click='$refs.menu.save(date)') 確認
						v-col.pl-1(cols='6')
							v-menu(ref='menu' v-model='endDayMenu' return-value.sync='date' transition='scale-transition' offset-y='offset-y' min-width='auto' right)
								template(v-slot:activator='{ on, attrs }')
									v-text-field.no-border(v-model='endDay' label='請選擇結束日期' prepend-inner-icon='mdi-calendar' v-bind='attrs' v-on='on' dense solo)
								v-date-picker(v-model='endDay' no-title='no-title')
									v-spacer
									v-btn(text='text' color='primary' @click='menu = false') 取消
									v-btn(text='text' color='primary' @click='$refs.menu.save(date)') 確認
				v-col.pl-3
					v-select(v-model='process' :items='processGroup' item-value='index' item-text='groupName' prepend-inner-icon='icon-step' height='36' flat dense solo)
				v-col.pl-3
					v-select(v-model='people' :items='peoples' item-value='index' item-text='name' prepend-inner-icon='icon-group' height='36' flat dense solo)
	#page-inner
		v-row
			v-col(cols='12' md='5')
				v-card.px-2.py-5(flat)
					v-row.align-center
						v-col(cols='10')
							h3.mb-0.d-flex.align-center
								.cube-icon.small.bg-primary.mr-3
									v-icon(size='19' color='white') icon-chart
								span Cumulative Revenue Forecast
						v-col.text-right(cols='2')
							v-tooltip(bottom)
								template(v-slot:activator='{ on, attrs }')
									v-btn.ml-auto(color='gary' outlined icon to='/Deals' v-bind='attrs' v-on='on')
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
			v-col(cols='12' md='auto')
				v-row.email-card-row(no-gutters)
					v-col.pr-2(cols='6')
						v-card.pa-4.mb-4(flat)
							h3.d-flex.align-center.mb-4
								.cube-icon.small.bg-og.mr-3
									v-icon(size='19' color='white') icon-mail
								h4.ellipsis E-mail Sent
								v-badge.ml-auto(color='secondary' content='17' inline='inline')
							.d-flex.align-center.justify-space-between.mb-2
								span 17 Linked to Contents
								.d-inline-flex.align-center
									span 16
									v-icon(size='14' color='success') icon-up-dir
							.d-flex.align-center.justify-space-between
								span 17 Linked to Deals
								.d-inline-flex.align-center
									span 16
									v-icon(size='14' color='success') icon-up-dir
					v-col.pl-2(cols='6')
						v-card.pa-4.mb-4(flat)
							h3.d-flex.align-center.mb-4
								.cube-icon.small.bg-gary.mr-3
									v-icon(size='19' color='white') icon-mail
								h4.ellipsis E-mail Received
								v-badge.ml-auto(color='secondary' content='17' inline='inline')
							.d-flex.align-center.justify-space-between.mb-2
								span 17 Linked to Contents
								.d-inline-flex.align-center
									span 16
									v-icon(size='14' color='success') icon-up-dir
							.d-flex.align-center.justify-space-between
								span 17 Linked to Deals
								.d-inline-flex.align-center
									span 16
									v-icon(size='14' color='success') icon-up-dir
				v-card.pa-4(flat)
					h3.mb-2.d-flex.align-center
						.cube-icon.small.bg-green.mr-3
							v-icon(size='19' color='white') icon-chatmoney
						span Deal Flow
					.d-flex.align-center.px-2
						doughnut-chart(:doughnut-data="doughnutData" :doughnut-options='doughnutOptions')
			v-col(cols='12' md='auto')
				v-card.most-won-card.height_100.pa-4.mb-4(flat)
					h3.mb-2.d-flex.align-center
						.cube-icon.small.bg-pink.mr-3
							v-icon(size='19' color='white') icon-user
						span Most deals won
					v-list
						v-list-item.px-0(v-for='(item, index) in wonLists' :key='index')
							a(href='/Account')
								v-list-item-avatar
									v-img(:src='item.avatar')
							v-list-item-content
								v-row(no-gutters)
									v-col(cols='8')
										a(href='/Account')
											v-list-item-title.mb-1(v-html='item.name')
											span.t-black {{ item.deals }} Deals
		v-row
			v-col(cols='12')
				v-card.pa-4.mb-5(flat)
					.d-flex.align-center.justify-space-between
						h3.mb-2.d-flex.align-center
							.cube-icon.small.bg-purple.mr-3
								v-icon(size='19' color='white') icon-chart
							span Opportunity created in last 30 days
						v-tooltip(bottom='')
							template(v-slot:activator='{ on, attrs }')
								v-btn.px-0(v-bind='attrs' v-on='on' min-width='40' text color='error')
									span 25%
									v-icon(size='20') icon-growth-chart
							span Total: 15M vs Last period: 20M
					v-data-table.dashboard-table(:headers='last30Headers' :items='last30Desserts' :items-per-page='5' hide-default-footer)
						template(v-slot:item.opportunityOwner='{ item }')
							a(href='/Account') {{ item.opportunityOwner }}
						template(v-slot:item.accountName='{ item }')
							a(href='/Account') {{ item.accountName }}
						template(v-slot:item.opportunityName='{ item }')
							a(href='/Deal') {{ item.opportunityName }}
				v-card.pa-4.mb-5(flat)
					h3.mb-2.d-flex.align-center
						.cube-icon.small.bg-og.mr-3
							v-icon(size='19' color='white') icon-chart
						span Top 5 opportunities
					v-data-table.dashboard-table(:headers='top5OpenHeaders' :items='top5OpenDesserts' :items-per-page='5' hide-default-footer)
						template(v-slot:item.accountName='{ item }')
							a(href='/Account') {{ item.accountName }}
						template(v-slot:item.opportunityName='{ item }')
							a(href='/Deal') {{ item.opportunityName }}
</template>

<script>
import yearBarChart from '../assets/script/barChart';
import weekBarChart from '../assets/script/barChart';
import quarterBarChart from '../assets/script/barChart';
import DoughnutChart from '../assets/script/doughnutChart';

export default {
	name: 'Dashboard',
	components: {
		yearBarChart,
		weekBarChart,
		quarterBarChart,
		DoughnutChart
	},
	data() {
		return {
			date: '',
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
			last30Headers: [
				{
					text: 'Opportunity Owner',
					align: 'start',
					sortable: true,
					value: 'opportunityOwner',
					width: 160,
				},
				{ text: 'Account Name', value: 'accountName', sortable: true },
				{ text: 'Opportunity Name', value: 'opportunityName', sortable: true, width: 380 },
				{ text: 'Stage', value: 'stage', sortable: true, width: 148 },
				{ text: 'Create Date', value: 'createDate', sortable: true, width: 108 },
				{ text: 'Amount', value: 'amount', sortable: true },
				{ text: 'Close Date', value: 'closeDate', sortable: true, width: 102 },
			],
			last30Desserts: [
				{
					opportunityOwner: 'Frozen Yogurt',
					accountName: 'Test Healthcare Account',
					opportunityName: 'Test Diagital Transformation Opp for Healthcare',
					stage: 'Perception Analysis',
					createDate: '2021/10/01',
					amount: '$9.00k',
					closeDate: '2021/10/10'
				},
				{
					opportunityOwner: 'Frozen Yogurt',
					accountName: 'Test Manufacturing Account',
					opportunityName: 'Test Diagital Transformation Opp for Manufacturing',
					stage: 'Perception Analysis',
					createDate: '2021/10/01',
					amount: '$9.00k',
					closeDate: '2021/10/10'
				},
				{
					opportunityOwner: 'Frozen Yogurt',
					accountName: 'Test Healthcare Account',
					opportunityName: 'Test Diagital Transformation Opp for Healthcare',
					stage: 'Perception Analysis',
					createDate: '2021/10/01',
					amount: '$9.00k',
					closeDate: '2021/10/10'
				},
				{
					opportunityOwner: 'Frozen Yogurt',
					accountName: 'Test Manufacturing Account',
					opportunityName: 'Test Diagital Transformation Opp for Manufacturing',
					stage: 'Perception Analysis',
					createDate: '2021/10/01',
					amount: '$9.00k',
					closeDate: '2021/10/10'
				},
			],
			top5OpenHeaders: [
				{ text: 'Account Name', value: 'accountName', sortable: true },
				{ text: 'Opportunity Name', value: 'opportunityName', sortable: true, width: 380 },
				{ text: 'Stage', value: 'stage', sortable: true, width: 148 },
				{ text: 'Amount', value: 'amount', sortable: true },
				{ text: 'Expected Revenue', value: 'expectedRevenue', sortable: true, width: 160 },
				{ text: 'Close Date', value: 'closeDate', sortable: true, width: 102 },
			],
			top5OpenDesserts: [
				{
					opportunityOwner: 'Frozen Yogurt',
					accountName: 'Test Healthcare Account',
					opportunityName: 'Test Diagital Transformation Opp for Healthcare',
					stage: 'Perception Analysis',
					amount: '$9.00k',
					expectedRevenue: '$10.00k',
					closeDate: '2021/10/10'
				},
				{
					opportunityOwner: 'Frozen Yogurt',
					accountName: 'Test Manufacturing Account',
					opportunityName: 'Test Diagital Transformation Opp for Manufacturing',
					stage: 'Perception Analysis',
					amount: '$9.00k',
					expectedRevenue: '$6.00k',
					closeDate: '2021/10/10'
				},
				{
					opportunityOwner: 'Frozen Yogurt',
					accountName: 'Test Healthcare Account',
					opportunityName: 'Test Diagital Transformation Opp for Healthcare',
					stage: 'Perception Analysis',
					amount: '$9.00k',
					expectedRevenue: '$10.00k',
					closeDate: '2021/10/10'
				},
				{
					opportunityOwner: 'Frozen Yogurt',
					accountName: 'Test Manufacturing Account',
					opportunityName: 'Test Diagital Transformation Opp for Manufacturing',
					stage: 'Perception Analysis',
					amount: '$9.00k',
					expectedRevenue: '$6.00k',
					closeDate: '2021/10/10'
				},
			],
			wonLists: [
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					name: 'Mario',
					deals: 5
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
					name: 'Andy',
					deals: 12
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
					name: 'Mei',
					deals: 3
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
					name: 'Gina',
					deals: 4
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
					name: 'Nancy',
					deals: 7
				},
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
			doughnutData: {
				labels: ['Lead In', 'Contact Made', 'Needs Defined', 'Proposal Made', 'NegoTiations Started'],
				datasets: [
					{
						data: [20,10,30,20,20],
						backgroundColor: ['rgb(81,139,242)','rgb(242,160,65)','rgb(0, 170, 96)','rgb(123,104,238)','rgb(240,89,117)']
					}
				]
			},
			doughnutOptions: {
				responsive: true,
				maintainAspectRatio: false,
				borderWidth: "10px",
				hoverBackgroundColor: "red",
				hoverBorderWidth: "10px",
				legend: {
					display: true,
					position: 'right',
				},
				plugins: {
					tooltip: {
						titleFontSize: 10,
						bodyFontSize: 10,
					}
				}
			},
		}
	},
}
</script>