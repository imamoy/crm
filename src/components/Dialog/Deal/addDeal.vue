<template lang="pug">
    //- v-dialog(v-model='addDealDialog' max-width='500' persistent)
        //- add-deal(@emitAddDealDialog='onEmitAddDealDialog')
    v-card.dealDialog
        v-card-title.d-flex.justify-center 新增交易
        v-card-text
            v-form(v-model='addDealValid' ref='form')
                v-text-field.mb-4(v-model='addDealName' label='交易標題' name='addDealName' :rules='addDealNameRules' required='required' large='large')
                v-text-field.no-border(v-model='addAccount' prepend-icon='mdi-account-multiple' label='帳戶名稱')
                v-text-field.no-border(v-model='addCompany' prepend-icon='mdi-domain' label='選擇公司')
                v-row(no-gutters='no-gutters')
                    v-col(cols='8')
                        v-text-field.no-border(v-model='addAmount' prepend-icon='icon-chatmoney' label='交易金額')
                    v-col(cols='4')
                        v-select.no-border(label='請選擇幣別' v-model='addCurrency' :items='addCurrencyList' item-value='index' item-text='name' flat)
                v-select.no-border(label='請選擇交易流程' v-model='addProcessGroup' :items='addProcessGroup' item-value='index' item-text='groupName' prepend-icon='mdi-sync' flat)
                v-stepper.process-box.mb-4(v-model='addDealProcessStep')
                    v-stepper-header.process-bar
                        template(v-for='item in process')
                            v-stepper-step(:key='`${item.step}-process`' :complete='processStep > item.step' :step='item.step' :class='getProcessColor(item.step)' edit-icon='icon-check' editable)
                v-text-field.no-border(v-model='addAccount' prepend-icon='mdi-account' label='擁有者')
        v-card-actions.px-2.py-4
            v-row
                v-col.pr-2(cols='6')
                    v-btn(:ripple='false' @click='onCancel' width='100%' height='40' color='cancel' depressed dark) 取消
                v-col.pl-2(cols='6')
                    v-btn(:ripple='false' @click='onConfirm' width='100%' height='40' color='success' depressed dark) 新增
</template>

<script>
	import Vue from 'vue';

	export default Vue.extend({
        data() {
			return {
                addDealProcessStep: 1,
                addDealValid: true,
                addDealName: '',
                addDealNameRules: [v => !!v || '標題為必填'],
                addDealType: '',
                addDateMenu: false,
                addDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                addTimeMenu: false,
                addTime: null,
                addAccount: '',
                addLocation: '',
                addAmount: '',
                addCompany: '',
                addCurrency: '',
                addCurrencyList: [{
                    name: 'NTD$',
                }],
                addProcessGroup: [{
                    groupName: 'Pipeline',
                }],
                processStep: 1,
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
				this.$emit('emitAddDealDialog', true);
			},
			onCancel() {
				this.$emit('emitAddDealDialog', false);
			},
		}
	});
</script>