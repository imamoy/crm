<template lang="pug">
    v-card.to-deal-dialog
        v-card-title.d-block.pt-5
            v-row.d-flex.align-center.mb-6(no-gutters)
                v-col(cols='11')
                    h2.mb-0 {{ deal.dealName }}
                v-col.text-right(cols='1')
                    v-btn(:ripple='false' @click='onCancel' depressed='depressed' icon)
                        v-icon icon-cancel
            v-card.card-preface.px-0.py-2(flat)
                v-row.pa-0
                    v-col.pa-2.pa-md-3(cols='6' md='2')
                        v-card-subtitle.pa-0.t-lightgary 帳戶名稱
                        a.f-text-highlight.mb-0(href='/Account') {{ deal.client }}
                    v-col.pa-2.pa-md-3(cols='6' md='2')
                        v-card-subtitle.pa-0.t-lightgary 結束日期
                        p.f-text-highlight.mb-0 {{ deal.finishDate }}
                    v-col.pa-2.pa-md-3(cols='6' md='2')
                        v-card-subtitle.pa-0.t-lightgary 金額
                        p.f-text-highlight.mb-0.t-green {{ deal.amount }}
                    v-col.pa-2.pa-md-3(cols='6' md='1')
                        v-card-subtitle.pa-0.t-lightgary 分數
                        p.f-text-highlight.mb-0 {{ deal.fraction }}
                    v-col.pa-2.pa-md-3(cols='6' md='1')
                        v-card-subtitle.pa-0.t-lightgary 達成率
                        p.f-text-highlight.mb-0.t-blue {{ deal.accomplish }}
                    v-col.pa-2.pa-md-3(cols='12' md='3')
                        v-list-item.pa-0
                            v-list-item-avatar.ma-0.mr-2(color='aliceBlue')
                                span.mx-auto(v-if="deal.ownerPic === ''") {{ deal.ownerNickName }}
                                img(v-else :src='deal.ownerPic' :alt='deal.ownerName')
                            v-list-item-content.pa-0
                                v-card-subtitle.pa-0.t-lightgary 機會擁有者
                                a.mb-0.f-text-highlight(href='') {{ deal.ownerName }}
        v-card-text.process-card.pt-0.pt-md-10
            v-stepper.process-box.py-4(v-model='processStep')
                v-stepper-header.process-bar
                    template(v-for='item in process')
                        v-stepper-step(:key='`${item.step}-process`' :complete='processStep > item.step' :step='item.step' :class='getProcessColor(item.step)' edit-icon='icon-check' :editable='isProcessEdit')
                            span(v-if='processStep <= item.step')  {{ item.stepName }}
                            span(v-else)  {{ item.workDay }} 天
                v-row(no-gutters)
                    v-col(cols='12' md='11')
                        v-stepper-items(:class="stepContent ? '':'hide' ")
                            v-stepper-content.pa-0(v-for='(item, index) in process' :key='`${index}-process`' :step='index + 1')
                                v-card(color='' flat height='146')
                                    v-row(no-gutters='no-gutters')
                                        v-col.pr-md-4(cols='12' md='6')
                                            h4.my-2 關鍵字
                                            p.d-flex.align-center.input-has-label.dance
                                                label(:for='`${index}-finishDate`') 結束日期
                                                v-text-field(v-model='item.stepFinishDate' :id='`${index}-finishDate`' solo dense='dense')
                                            p.d-flex.align-center.input-has-label.dance
                                                label(:for='`${index}-describe`') 描述
                                                v-text-field(v-model='item.describe' :id='`${index}-describe`' solo dense='dense')
                                            p.d-flex.align-center.input-has-label.dance
                                                label(:for='`${index}-budgetConfirm`') Budget Confirm
                                                v-text-field(v-model='item.budgetConfirm' :id='`${index}-budgetConfirm`' solo dense='dense')
                                        v-col.pl-md-4(cols='12' md='6')
                                            h4.my-2 {{ item.guideTitle }}
                                            p.mb-0.pt-1 {{ item.guideContent }}
                    v-col.pt-4.pl-md-4(cols='12' md='1')
                        v-btn.go-deal-btn(@click='toDealPage()' width='100%' height='100%' color='purple' outlined)
                            v-icon(size='36') icon-chatmoney-border
                            span 前往頁面
</template>

<script>
	import Vue from 'vue';

	export default Vue.extend({
        data() {
			return {
                processStep: 1,
                processComplete: false,
                isProcessEdit: false,
                stepContent: true,
                deal: {
                    dealName: '信義區吳興街3號房地產業務',
                    client: '王先生',
                    clientConpany: '',
                    dealType: '新機會',
                    event: '',
                    creatDate: '',
                    finishDate: '2021/07/17',
                    amount: 50000,
                    fraction: 19,
                    accomplish: '90%',
                    ownerName: 'James Campbell',
                    ownerNickName: 'JC',
                    ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
                    budgetConfirmed: false,
                    discoveryCompleted: false,
                    ROIAnalysisCompleted: false,
                    processNow: 'Proposal Made',
                    possibility: '50%',
                },
                process: [{
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
				this.$emit('emitToDealDialog', true);
			},
			onCancel() {
				this.$emit('emitToDealDialog', false);
			},
            toDealPage: function () {
                window.location.href = 'Deal';
            }
		}
	});
</script>