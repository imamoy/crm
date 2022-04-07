<template lang="pug">
    v-card.dealDialog
        v-card-title.d-flex.justify-center 編輯交易
        v-card-text
            v-form(v-model='editDealValid' ref='form')
                v-text-field.mb-4(v-model='editDealName' label='機會名稱' name='editDealName' :rules='editDealNameRules' required='required' large='large')
                v-row(no-gutters='no-gutters')
                    v-col(cols='12' md='6')
                        v-text-field.no-border(v-model='editDealAccount' prepend-icon='mdi-domain' label='帳戶名稱')
                    v-col(cols='12' md='6')
                        v-menu(ref='menu' v-model='editDealDateMenu' return-value.sync='date' transition='scale-transition' offset-y='offset-y' min-width='auto')
                            template(v-slot:activator='{ on, attrs }')
                                v-text-field.no-border(v-model='editDealDate' label='結束日期' prepend-icon='mdi-calendar' v-bind='attrs' v-on='on')
                            v-date-picker(v-model='editDealDate' no-title='no-title')
                                v-spacer
                                v-btn(text='text' color='primary' @click='menu = false') 取消
                                v-btn(text='text' color='primary' @click='$refs.menu.save(date)') 確認
                v-select.no-border(label='交易類型' v-model='editDealProcessGroup' :items='editDealProcessGroup' item-value='index' item-text='groupName' prepend-icon='mdi-sync' flat)
                v-stepper.process-box.mb-4(v-model='processStep')
                    v-stepper-header.process-bar
                        template(v-for='item in process')
                            v-stepper-step(:key='`${item.step}-process`' :complete='processStep > item.step' :step='item.step' :class='getProcessColor(item.step)' edit-icon='icon-check' editable)
                v-row(no-gutters='no-gutters')
                    v-col(cols='12' md='6')
                        v-text-field.no-border(v-model='editDealAmount' prepend-icon='icon-chatmoney' label='交易金額')
                    v-col(cols='12' md='6')
                        v-select.no-border(label='幣別' v-model='editDealCurrency' :items='editDealCurrencyList' item-value='index' item-text='name' flat)
                    v-col(cols='12' md='6')
                        v-select.no-border(label='可能性' v-model='editDealPossibility' :items='editDealPossibilityList' prepend-icon='icon-chart' flat)
                    v-col(cols='12' md='6')
                        v-text-field.no-border(v-model='editDealOwn' prepend-icon='mdi-account' label='擁有者')
        v-card-actions.px-2.py-4
            v-row
                v-col.pr-2(cols='6')
                    v-btn(:ripple='false' @click='onCancel' width='100%' height='40' color='cancel' depressed dark) 取消
                v-col.pl-2(cols='6')
                    v-btn(:ripple='false' @click='onConfirm' width='100%' height='40' color='success' depressed dark) 儲存
</template>

<script>
	import Vue from 'vue';

	export default Vue.extend({
        data() {
			return {
                processStep: 1,
                editDealValid: true,
                editDealName: '信義區吳興街3號房地產業務',
                editDealNameRules: [v => !!v || '標題為必填'],
                editDealType: '新機會',
                editDealDateMenu: false,
                editDealDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                editDealAccount: 50000,
                editDealAmount: 50000,
                editCompany: '王先生',
                editDealCurrency: 'NTD$',
                editDealCurrencyList: [{
                    name: 'NTD$',
                }],
                editDealProcessGroup: 'Pipeline',
                editDealProcessGroupList: [{
                    groupName: 'Pipeline',
                }],
                editDealPossibility: '',
                editDealPossibilityList: ['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
                editDealOwn: 'James Campbell',
                process: [
                    {
                        step: 1,
                        stepName: 'Lead In',
                        finish: true,
                        isInProcess: false,
                        workDay: 30,
                        keyWord: '關鍵字',
                        stepStartDate: '2021/06/30',
                        stepFinishDate: '2021/06/30',
                        describe: '',
                        budgetConfirm: '',
                        guideTitle: '成功的引導',
                        guideContent: 'Qualify your opportunity.',
                    },
                    {
                        step: 2,
                        stepName: 'Contact Made',
                        finish: true,
                        isInProcess: false,
                        workDay: 30,
                        keyWord: '關鍵字',
                        stepStartDate: '2021/06/30',
                        stepFinishDate: '2021/06/30',
                        describe: '',
                        budgetConfirm: '',
                        guideTitle: '成功的引導',
                        guideContent: 'Qualify your opportunity.',
                    },
                    {
                        step: 3,
                        stepName: 'Needs Defined',
                        finish: true,
                        isInProcess: false,
                        workDay: 30,
                        keyWord: '關鍵字',
                        stepStartDate: '2021/06/30',
                        stepFinishDate: '2021/06/30',
                        describe: '',
                        budgetConfirm: '',
                        guideTitle: '成功的引導',
                        guideContent: 'Qualify your opportunity.',
                    },
                    {
                        step: 4,
                        stepName: 'Proposal Made',
                        finish: false,
                        isInProcess: true,
                        workDay: 30,
                        keyWord: '關鍵字',
                        stepStartDate: '2021/06/30',
                        stepFinishDate: '2021/06/30',
                        describe: '',
                        budgetConfirm: '',
                        guideTitle: '成功的引導',
                        guideContent: 'Qualify your opportunity.',
                    },
                    {
                        step: 5,
                        stepName: 'NegoTiations Started',
                        finish: false,
                        isInProcess: false,
                        workDay: 30,
                        keyWord: '關鍵字',
                        stepStartDate: '2021/06/30',
                        stepFinishDate: '2021/06/30',
                        describe: '',
                        budgetConfirm: '',
                        guideTitle: '成功的引導',
                        guideContent: 'Qualify your opportunity.',
                    },
                ],
			}
		},
        methods: {
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
			validate() {
				this.$refs.form.validate()
			},
			onConfirm() {
				this.$emit('emitEditDealDialog', true);
			},
			onCancel() {
				this.$emit('emitEditDealDialog', false);
			},
		}
	});
</script>