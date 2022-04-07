<template lang='pug'>
	#Deals.main-page.page-noScroll.pb-0
		v-row#page-head.d-flex.align-center.justify-md-space-between
			v-col.d-flex.align-center.px-0.pb-0.px-md-2.pb-md-4(cols='4' md='6' lg='2')
				h1.my-0 Deals
				v-btn.ml-3.add-deal-btn(@click='showAddDealDialog' width='40' height='40' :ripple='false' color='success' depressed dark fab)
					v-icon(size='16') icon-add
			v-col.text-right.pa-0.pt-3.pt-md-2.pa-md-4.ml-md-auto(cols='8' md='6' lg='2')
				span $325,000・17 deals
			v-col.px-0.pt-4.pt-md-2(cols='12' md='12' lg='5')
				v-row.d-flex.align-center.justify-space-between.justify-md-end
					v-col.pa-0.px-md-0.py-md-4.d-flex.justify-space-between.justify-md-center(cols='12' md='3')
						.btn-switch
							v-btn(:ripple='false' @click='viewBoard' min-width='50%' width='50%' height='36' :color="isBoardView? 'primary':'white'"  depressed tile :dark='isBoardView')
								v-icon(size='16') icon-board
							v-btn(:ripple='false' @click='viewList' min-width='50%' width='50%' height='36' :color="isBoardView? 'white':'primary'" depressed tile :dark='!isBoardView')
								v-icon(size='16') icon-list
					v-col(cols='12' md='9' :class="isDealsFilter ? 'deals-filter active':'deals-filter'")
						v-row
							v-col.pl-md-0(cols='12' lg='6' v-if='isBoardView')
								.btn-group
									v-select(v-model='processGroup[0].groupName' :items='processGroup' item-value='index' item-text='groupName' height='36' flat dense solo)
									v-btn.border-left(:ripple='false' min-width='36' width='36' height='36' color='white' depressed tile dark)
										v-icon(size='16') icon-add
							v-col.pl-md-0(cols='12' lg='6' v-else)
								.btn-group
									v-text-field(v-model='searchDeals' height='36' flat dense solo prepend-inner-icon='icon-search')
							v-col.pr-md-0.pl-md-1(cols='12' lg='6')
								.btn-group
									v-select(v-model='users[0]' :items='users' max-width='100' height='36' flat dense solo)
		#page-inner.scroll-x.pt-md-6.pb-0(v-if='isBoardView')
			v-row(class='d-flex justify-space-between flex-nowrap height_100' v-for='item, index in processGroup' :key='index')
				v-col.pa-0.pr-2.px-md-2(col='auto' v-for='subitem, index in item.process' :key='index')
					v-card.deal-group(min-width='280' max-width='460' outlined flat)
						v-system-bar(height='8' :color='getProcessColor(subitem.stepIdx)')
						v-card-title.pa-0(:eventColor='getStatusColor(subitem.eventStatus)')
							v-badge(color='secondary' :content='subitem.dealNumbers' inline='inline')
								h4.ellipsis {{ subitem.stepName }}
						p.mt-1.mb-0.deals-totalAmount $ {{ amountFormat(subitem.totalAmount) }}
						v-card-text.pa-0
							draggable(:list='subitem.deals' group="deals" style='height:98%')
								v-card.deals-item(v-for='dealsItem, index in subitem.deals' :key='index' flat)
									v-card-title.d-flex.align-center.justify-space-between.pa-0
										.d-flex.align-center
											v-icon.mr-1.drag-icon(color='lightGary' size='16') icon-drag
											h5.ellipsis(@click='showToDealDialog') {{ dealsItem.dealName }}
										v-menu(bottom right)
											template(v-slot:activator='{ on, attrs }')
												v-btn(width='14' height='14' :color='getStatusColor(dealsItem.eventStatus)' v-bind='attrs' v-on='on' fab depressed)
											v-list.pa-0
												v-list-item.px-0.text-center
													v-btn(@click='onAddActivity' text='text')
														v-icon(size='18') icon-task
														span.ml-1 新增行程
									v-card-text.pa-0(@click='showToDealDialog')
										p.mt-1.mb-0 {{ dealsItem.client }}
										v-row.d-flex.align-center(no-gutters='no-gutters')
											v-col(cols='9')
												span $ {{ amountFormat(dealsItem.amount) }}
											v-col.text-right(cols='3')
												v-avatar(color='aliceBlue' size='28')
													span(v-if="dealsItem.ownerPic === ''") {{ dealsItem.ownerNickName }}
													img(v-else :src='dealsItem.ownerPic' :alt='dealsItem.ownerName')
						v-card-actions.text-center
							v-btn.mx-auto(@click='showAddDealDialog' :ripple='false' width='32' height='32' color='grey lighten-1' depressed dark fab='fab')
								v-icon(size='16') icon-add
		#page-inner.pt-0.mt-2.mt-sm-3(v-else)
			.data-area
				v-data-table(class='deals-table height_100' :headers='dealsHeaders' :items='dealsTable' :search='searchDeals' :items-per-page='itemPerPage' :page.sync='page' @page-count='pageCount = $event' height='100%' hide-default-footer='hide-default-footer')
					template(v-slot:item.dealName='{ item }')
						a(href='/Deal') {{ item.dealName }}
						v-system-bar(:color='getProcessColor(item.processStep)')
					template(v-slot:item.client='{ item }')
						a(href='/Account') {{ item.client }}
					template(v-slot:item.amount='{ item }')
						span $ {{ amountFormat(item.amount) }}
					template(v-slot:item.ownerName='{ item }')
						a.t-primary(href='/Account') {{ item.ownerName }}
					template(v-slot:item.active='{ item }')
						v-btn(icon='icon' @click='showToDealDialog')
							v-icon(size='18') icon-edit
						v-btn(icon='icon' @click='onAddActivity')
							v-icon(size='18') icon-task
						v-btn(icon='icon' @click='onDelete')
							v-icon(size='18') icon-remove
				v-pagination.py-1.mb-3(v-model='page' :length='pageCount' circle='circle')
		v-dialog(v-model='activityDialog' width='470' data-app='true' persistent)
			activity-dialog(@emitActivityDialog='onEmitActivityDialog')
		v-dialog(v-model='addDealDialog' max-width='500' persistent)
			add-deal(@emitAddDealDialog='onEmitAddDealDialog')
		v-dialog(v-model='toDealDialog' max-width='1200' persistent)
			to-deal(@emitToDealDialog='onEmitToDealDialog')
		v-dialog(v-model='messageDialog' width='360' persistent content-class='statusDialog')
			message-dialog(@emitMessageDialog='onEmitMessageDialog' :message='message')
		v-dialog(v-model='successDialog' width='360' persistent content-class='statusDialog')
			success-dialog(@emitSuccessDialog='onEmitSuccessDialog')
		v-dialog(v-model='errorDialog' width='360' persistent content-class='statusDialog')
			error-dialog(@emitErrorDialog='onEmitErrorDialog' :errorMessage='errorMessage')
</template>

<script>
	import activityDialog from '@/components/Dialog/activityDialog';
	import addDeal from '@/components/Dialog/Deal/addDeal';
	import toDeal from '@/components/Dialog/Deal/toDeal';
	import messageDialog from '@/components/Dialog/messageDialog';
	import successDialog from '@/components/Dialog/successDialog';
	import errorDialog from '@/components/Dialog/errorDialog';
	import draggable from 'vuedraggable';

	export default {
		name: 'Deals',
		components: {
			activityDialog,
			addDeal,
			toDeal,
			messageDialog,
			successDialog,
			errorDialog,
			draggable
		},
		data() {
			return {
				isMobile: false,
				isBoardView: true,
				isDealsFilter: false,
				page: 1,
				pageCount: 0,
				processGroup: [{
					groupName: 'Pipeline',
					process: [{
							stepIdx: 1,
							stepName: 'Lead In',
							color: '',
							dealNumbers: 6,
							totalAmount: 161500,
							deals: [{
									eventStatus: 1,
									dealName: 'Bag End deal',
									client: 'Bag end',
									amount: 50000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/17'
								},
								{
									eventStatus: 2,
									dealName: 'Shady Acres deal',
									client: 'Shady Acres',
									amount: 12000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 2,
									dealName: 'Murrieta deal',
									client: 'Murrieta',
									amount: 12000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 3,
									dealName: 'Coke Deal',
									client: 'Coke',
									amount: 50000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 3,
									dealName: 'Zion deal',
									client: 'Zion',
									amount: 33000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 4,
									dealName: 'Oceanic Airlines deal',
									client: 'Oceanic Airlines',
									amount: 4500,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
							]
						},
						{
							stepIdx: 2,
							stepName: 'Contact Made',
							color: '',
							dealNumbers: 4,
							totalAmount: 103500,
							deals: [{
									eventStatus: 1,
									dealName: 'Erebor deal',
									client: 'Erebor',
									amount: 33000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 2,
									dealName: 'Scenic Bayview deal',
									client: 'Scenic Bayviews',
									amount: 4500,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/01'
								},
								{
									eventStatus: 2,
									dealName: 'Proudfeet deal',
									client: 'Proudfeet',
									amount: 33000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 3,
									dealName: 'Boardwalk deal',
									client: 'Boardwalk',
									amount: 33000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
							]
						},
						{
							stepIdx: 3,
							stepName: 'Needs Defined',
							color: '',
							dealNumbers: 3,
							totalAmount: 42000,
							deals: [{
									eventStatus: 3,
									dealName: 'Bass Industries deal',
									client: 'Bass Industries',
									amount: 33000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 2,
									dealName: 'Hilldale deal',
									client: 'Hilldale',
									amount: 4500,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/01'
								},
								{
									eventStatus: 2,
									dealName: 'Nakatomi Trading Corp',
									client: 'Nakatomi Trading Corp.',
									amount: 4500,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/08/10'
								}
							]
						},
						{
							stepIdx: 4,
							stepName: 'Proposal Made',
							color: '',
							dealNumbers: 2,
							totalAmount: 9000,
							deals: [{
									eventStatus: 3,
									dealName: 'Tuscany Hills deal',
									client: 'Tuscany Hills',
									amount: 4500,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 2,
									dealName: 'Tri State Realty deal',
									client: 'Tri State Realty',
									amount: 4500,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/01'
								}
							]
						},
						{
							stepIdx: 5,
							stepName: 'NegoTiations Started',
							color: '',
							dealNumbers: 2,
							totalAmount: 9000,
							deals: [{
									eventStatus: 3,
									dealName: 'Viasat deal',
									client: 'Viasat',
									amount: 4500,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/16'
								},
								{
									eventStatus: 2,
									dealName: 'iDirect deal',
									client: 'iDirect',
									amount: 50000,
									ownerName: 'James Campbell',
									ownerNickName: 'JC',
									ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
									finishDate: '2021/07/01'
								}
							]
						}
					]
				}],
				eventStatus: [{
						idx: 1,
						color: 'green',
						statusName: '本日待處理行程'
					},
					{
						idx: 2,
						color: 'red',
						statusName: '行程已逾期'
					},
					{
						idx: 3,
						color: 'gary',
						statusName: '本日行程已處理'
					},
					{
						idx: 4,
						color: 'orange',
						statusName: '無規劃的行程'
					},
				],
				users: ['James Campbell'],
				searchDeals: '',
				dealsHeaders: [{
						text: '機會名稱',
						value: 'dealName',
						align: 'center'
					},
					{
						text: '帳戶名稱',
						value: 'client',
						align: 'center'
					},
					{
						text: '金額',
						value: 'amount',
						align: 'right',
						width: 180
					},
					{
						text: '結束日期',
						value: 'finishDate',
						align: 'center'
					},
					{
						text: '機會擁有者',
						value: 'ownerName',
						align: 'center',
						width: 200
					},
					// { text: '行程狀態', value: 'eventStatus', align: 'center', width: 120},
					{
						text: '執行',
						value: 'active',
						align: 'center',
						width: 160
					},
				],
				dealsTable: [{
						eventStatus: 1,
						dealName: 'Bag End deal',
						client: 'Bag end',
						amount: 50000,
						processStep: 1,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/17'
					},
					{
						eventStatus: 2,
						dealName: 'Shady Acres deal',
						client: 'Shady Acres',
						amount: 12000,
						processStep: 1,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 2,
						dealName: 'Murrieta deal',
						client: 'Murrieta',
						amount: 12000,
						processStep: 1,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 3,
						dealName: 'Coke Deal',
						client: 'Coke',
						amount: 50000,
						processStep: 1,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 3,
						dealName: 'Zion deal',
						client: 'Zion',
						amount: 33000,
						processStep: 1,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 4,
						dealName: 'Oceanic Airlines deal',
						client: 'Oceanic Airlines',
						amount: 4500,
						processStep: 1,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 1,
						dealName: 'Erebor deal',
						client: 'Erebor',
						amount: 33000,
						processStep: 2,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 2,
						dealName: 'Scenic Bayview deal',
						client: 'Scenic Bayviews',
						amount: 4500,
						processStep: 2,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/01'
					},
					{
						eventStatus: 2,
						dealName: 'Proudfeet deal',
						client: 'Proudfeet',
						amount: 33000,
						processStep: 2,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 3,
						dealName: 'Boardwalk deal',
						client: 'Boardwalk',
						amount: 33000,
						processStep: 2,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 3,
						dealName: 'Bass Industries deal',
						client: 'Bass Industries',
						amount: 33000,
						processStep: 3,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 2,
						dealName: 'Hilldale deal',
						client: 'Hilldale',
						amount: 4500,
						processStep: 3,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/01'
					},
					{
						eventStatus: 2,
						dealName: 'Nakatomi Trading Corp',
						client: 'Nakatomi Trading Corp.',
						amount: 4500,
						processStep: 3,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/08/10'
					},
					{
						eventStatus: 3,
						dealName: 'Tuscany Hills deal',
						client: 'Tuscany Hills',
						amount: 4500,
						processStep: 4,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 2,
						dealName: 'Tri State Realty deal',
						client: 'Tri State Realty',
						amount: 4500,
						processStep: 4,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/01'
					},
					{
						eventStatus: 3,
						dealName: 'Viasat deal',
						client: 'Viasat',
						processStep: 5,
						amount: 4500,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/16'
					},
					{
						eventStatus: 2,
						dealName: 'iDirect deal',
						client: 'iDirect',
						amount: 50000,
						processStep: 5,
						ownerName: 'James Campbell',
						ownerNickName: 'JC',
						ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						finishDate: '2021/07/01'
					}
				],
				itemPerPage: 12,
				// Dialog
				activityDialog: false,
				addDealDialog: false,
				toDealDialog: false,
				messageDialog: false,
				message: '',
				successDialog: false,
				errorDialog: false,
				errorMessage: ''
			}
		},
		mounted() {
			this.onResize();
		},
		methods: {
			amountFormat: function (amount) {
				const val = amount.toString();
				return val.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
			},
			getProcessColor: function (groupIdx) {
				let color = '';
				switch (groupIdx) {
					case 1:
						color = 'primary';
						break;
					case 2:
						color = 'orange';
						break;
					case 3:
						color = 'green';
						break;
					case 4:
						color = 'purple';
						break;
					case 5:
						color = 'red';
						break;
					default:
						color = 'gary';
						break;
				}
				return color;
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
			viewBoard: function () {
				this.isBoardView = true;
			},
			viewList: function () {
				this.isBoardView = false;
			},
			onResize: function () {
				if (window.innerWidth > 1901) {
					this.itemPerPage = 12;
				} else if (window.innerWidth > 1600 && window.innerWidth < 1900) {
					this.itemPerPage = 11;
				} else if (window.innerWidth < 1590) {
					this.itemPerPage = 9;
				} else if (window.innerWidth < 767) {
					this.isMobile = true;
				}
			},
			// Dialog
			onAddActivity() {
				this.activityDialog = true;
			},
			onEmitActivityDialog(val) {
				this.activityDialog = false;
				if (val) {
					this.showSussessDialog();
				}
			},
			showAddDealDialog() {
				this.addDealDialog = true;
			},
			onEmitAddDealDialog(val) {
				this.addDealDialog = false;
				if (val) {
					this.showSussessDialog();
				}
			},
			showToDealDialog() {
				this.toDealDialog = true;
			},
			onEmitToDealDialog() {
				this.toDealDialog = false;
			},
			showSussessDialog() {
				this.successDialog = true;
			},
			onEmitSuccessDialog() {
				this.successDialog = false;
			},
			onDelete () {
				this.showMessageDialog('您確定要刪除此工作嗎？');
			},
			showMessageDialog(message) {
				this.messageDialog = true;
				this.message = message;
			},
			onEmitMessageDialog(val) {
				this.messageDialog = false;
				if (val) { this.successDialog = true; }
			},
			showErrorDialog(message) {
				this.errorDialog = true;
				this.errorMessage = message;
			},
			onEmitErrorDialog(val) {
				this.errorMessage = false;
				if (val) { console.log('如果確認 執行'); }
			},
			log: function(evt) {
				window.console.log(evt);
			}
		}
	}
</script>