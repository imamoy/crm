<template lang='pug'>
    #Contact.main-page.detail-page
        v-overlay(v-model='loading' z-index='99' opacity='.6')
            v-progress-circular(indeterminate color='primary')
        div.height_100(v-show='!loading')
            v-breadcrumbs.pa-0.px-3.pb-2(:items='breadcrumbs')
            v-row#page-head.d-flex.align-center.my-0
                v-col(cols='12' lg='8')
                    .d-flex.align-center
                        v-list-item-avatar.ma-0.mr-3(color='aliceBlue')
                            span.mx-auto(v-if="contactInfo.pic === ''") {{ contactInfo.pic }}
                            img(v-else :src='contactInfo.pic' :alt='contactInfo.pic')
                        h1.my-0 {{ contactInfo.name }}
                v-col(cols='12' lg='4')
                    v-row.justify-md-end(no-gutters='no-gutters')
                        v-col.ml-2(cols='auto')
                            .btn-group
                                v-btn(@click='showEditContactDetail' width='60' height='30' color='white' depressed tile dark)
                                    span 編輯
                                v-btn.border-left(@click='onDelete' width='60' height='30' color='white' depressed tile dark)
                                    span 刪除
                        v-col.ml-2(cols='auto')
                            .btn-group
                                v-btn(@click='onChangeOwn' width='100' height='30' color='white' depressed tile dark)
                                    span 變更擁有者
                        v-col.ml-2(cols='auto')
                            v-btn(@click='showAddDealDialog' width='130' height='32' color='green' depressed dark)
                                v-icon.mr-1(size='14') icon-add
                                span Add Deal
            #page-inner.pa-3.pt-0
                v-card.card-preface.card-shadow.px-0.py-6(flat)
                    v-row
                        v-col.px-2.px-md-4.py-0(cols='6' md='2')
                            v-list-item.d-flex.align-center.px-0
                                v-list-item-icon.mt-3.mb-0.mr-2
                                    v-icon(size='28') mdi-briefcase
                                v-list-item-content.pa-0
                                    v-card-subtitle.pa-0.t-lightgary 職稱
                                    .f-text-highlight.mb-0 {{ contactInfo.job }}
                        v-col.px-2.px-md-4.py-0.border-left(cols='6' md='2')
                            v-list-item.d-flex.align-center.px-0
                                v-list-item-icon.mt-3.mb-0.mr-2
                                    v-icon(size='28') mdi-domain
                                v-list-item-content.pa-0
                                    v-card-subtitle.pa-0.t-lightgary 公司名稱
                                    a.t-primary.f-text-highlight.mb-0(href='/Account') {{ contactInfo.company.name }}
                        v-col.px-2.px-md-4.py-0.border-left(cols='6' md='2')
                            v-list-item.d-flex.align-center.px-0
                                v-list-item-icon.mt-3.mb-0.mr-2
                                    v-icon(size='28') mdi-phone
                                v-list-item-content.pa-0
                                    v-card-subtitle.pa-0.t-lightgary 行動電話
                                    a.f-text-highlight.mb-0(:href='onCall(contactInfo.phone)' target='_blank') {{ contactInfo.phone }}
                        v-col.px-2.px-md-4.py-0.border-left(cols='6' md='3')
                            v-list-item.d-flex.align-center.px-0
                                v-list-item-icon.mt-3.mb-0.mr-2
                                    v-icon(size='28') mdi-mail
                                v-list-item-content.pa-0
                                    v-card-subtitle.pa-0.t-lightgary E-mail
                                    a.f-text-highlight.mb-0(:href='onMall(contactInfo.mail)' target='_blank') {{ contactInfo.mail }}
                        v-col.px-2.px-md-4.py-0.border-left(cols='12' md='3')
                            v-list-item.d-flex.align-center.pa-0
                                v-list-item-avatar.ma-0.mr-2(color='aliceBlue')
                                    span.mx-auto(v-if="contactInfo.ownerPic === ''") {{ contactInfo.ownerNickName }}
                                    img(v-else :src='contactInfo.ownerPic' :alt='contactInfo.ownerName')
                                v-list-item-content.pa-0
                                    v-card-subtitle.pa-0.t-lightgary 機會擁有者
                                    a.t-primary.mb-0.f-text-highlight(href='/Account') {{ contactInfo.ownerName }}
                v-row.account-info.mt-5(no-gutters='no-gutters')
                    v-col(cols='12' md='8')
                        v-card.deal-tab-card(flat)
                            v-tabs.main-tabs(v-model='tab' background-color='transparent' :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : ''" :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : ''" show-arrows height='53')
                                v-tabs-slider
                                v-tab(v-for='item in tabs' :key='item.key' :href='`#tab-${item.id}`')
                                    | {{ item.name }}
                                // - Detail -
                                v-tab-item.pa-3(key='detail' value='tab-1' :transition='false' :reverse-transition='false')
                                    .d-flex.align-center.justify-space-between.mt-2.mb-4
                                        h3.d-flex.align-center
                                            .cube-icon.small.bg-og.mr-2
                                                v-icon(size='19' color='white') icon-chatmoney
                                            span 商機
                                        v-btn.pa-0(v-if='contactInfo.deals.length >= 4' @click='moreDeals' color='primary' text) MORE
                                    v-row.small-deals-box(:class="showDealsMore ? 'show-more':''")
                                        v-col.px-1.py-3(cols='12' md='4' v-for='dealsItem, index in contactInfo.deals' :key='index')
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
                                    h3.mt-7.mb-4.d-flex.align-center
                                        .cube-icon.small.bg-primary.mr-2
                                            v-icon(size='21' color='white') mdi-account
                                        span 聯絡人資訊
                                    v-row(no-gutters)
                                        v-col.pr-md-4(cols='12' md='6')
                                            p.d-flex.align-center.input-has-label
                                                label 姓名
                                                v-text-field(v-model='contactInfo.name' solo :readonly='isDetailReadonly')
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                            div.d-flex.align-center.justify-space-between.input-has-label
                                                .d-inline-flex.align-center
                                                    label 聯絡電話
                                                    v-text-field(v-if='!isDetailReadonly' v-model='contactInfo.cell' solo)
                                                    a.t-primary(v-else :href='onCall(contactInfo.cell)') {{ contactInfo.cell }}
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                            div.d-flex.align-center.justify-space-between.input-has-label
                                                .d-inline-flex.align-center
                                                    label 行動電話
                                                    v-text-field(v-if='!isDetailReadonly' v-model='contactInfo.phone' solo)
                                                    a.t-primary(v-else :href='onCall(contactInfo.phone)') {{ contactInfo.phone }}
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                            div.d-flex.align-center.justify-space-between.input-has-label
                                                .d-inline-flex.align-center
                                                    label E-mail
                                                    v-text-field(v-if='!isDetailReadonly' v-model='contactInfo.mail' solo)
                                                    a.t-primary(v-else :href='onMall(contactInfo.mail)') {{ contactInfo.mail }}
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                        v-col.pl-md-4(cols='12' md='6')
                                            p.d-flex.align-center.input-has-label
                                                label 職稱
                                                v-text-field(v-model='contactInfo.job' solo :readonly='isDetailReadonly')
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                            p.d-flex.align-center.input-has-label
                                                label 分機
                                                v-text-field(v-model='contactInfo.extension' solo :readonly='isDetailReadonly')
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                            div.d-flex.align-center.justify-space-between.input-has-label
                                                .d-inline-flex.align-center
                                                    label 聯絡人擁有者
                                                    v-text-field(v-if='!isDetailReadonly' v-model='contactInfo.mail' solo)
                                                    a.t-primary(v-else href) {{ contactInfo.mail }}
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                    h3.mt-7.mb-4.d-flex.align-center
                                        .cube-icon.small.bg-purple.mr-2
                                            v-icon(size='20' color='white') mdi-domain
                                        span 公司資訊
                                    v-row(no-gutters)
                                        v-col.pr-md-4(cols='12' md='6')
                                            div.d-flex.align-center.justify-space-between.input-has-label
                                                .d-inline-flex.align-center
                                                    label 公司名稱
                                                    v-text-field(v-if='!isDetailReadonly' v-model='contactInfo.company.name' solo)
                                                    a.t-primary(v-else href='/Account') {{ contactInfo.company.name }}
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                            div.d-flex.align-center.justify-space-between.input-has-label
                                                .d-inline-flex.align-center
                                                    label 網站
                                                    v-text-field(v-if='!isDetailReadonly' v-model='contactInfo.company.web' solo)
                                                    a.t-primary(href='contactInfo.company.web' target='_blank') {{ contactInfo.company.web }}
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                        v-col.pl-md-4(cols='12' md='6')
                                            div.d-flex.align-center.justify-space-between.input-has-label
                                                .d-inline-flex.align-center
                                                    label 公司電話
                                                    v-text-field(v-if='!isDetailReadonly' v-model='contactInfo.company.cell' solo)
                                                    a.t-primary(v-else :href='onCall(contactInfo.company.cell)') {{ contactInfo.company.cell }}
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                            p.d-flex.align-center.input-has-label
                                                label 公司傳真
                                                v-text-field(v-model='contactInfo.company.fax' solo :readonly='isDetailReadonly')
                                                v-btn.ml-1(icon color='gary' @click='onEditDetail')
                                                    v-icon(size='18') icon-edit
                                    v-row(no-gutters)
                                        v-col.d-flex.align-center.justify-end.ml-auto(cols='6' v-if='!showDetailEditBtn')
                                            v-btn(width='70' text color='gary' @click='cancelEditDetail()')
                                                v-icon(size='20') icon-cancel
                                                span 取消
                                            v-btn.ml-3(width='70' text color='success' @click='confirmEditDetail()')
                                                v-icon(size='20') icon-check
                                                span 儲存
                                // - note -
                                v-tab-item.pa-3(key='note' value='tab-2' :transition='false' :reverse-transition='false')
                                    .editor
                                    v-timeline.mt-5.pt-0(dense align-top)
                                        template(v-for='(item, index) in timeLine')
                                            v-timeline-item(v-if="item.type === 'note'" :key='index' color='success' :icon='item.icon' small right fill-dot)
                                                v-card.timeLine-note.px-3.py-1(flat outlined)
                                                    v-row.justify-space-between.align-center(no-gutters)
                                                        v-col.f-smaller.t-lightgary.t-lightgary.d-flex.align-center(cols='10')
                                                            span.mr-3
                                                                | {{ item.date }} ・
                                                                | {{ item.owner }}
                                                        v-col.text-right(cols='1')
                                                            v-menu(bottom left)
                                                                template(v-slot:activator='{ on, attrs }')
                                                                    v-btn.ml-3(color='primary' dark v-bind='attrs' v-on='on' icon)
                                                                        v-icon(size='16')  icon-dot-3
                                                                v-list.pa-0
                                                                    v-list-item.px-0.text-center
                                                                        v-btn(text='text')
                                                                            span.ml-1 編輯
                                                                    v-list-item.px-0.text-center
                                                                        v-btn(@click='onDetele(item)' text='text')
                                                                            span.ml-1 刪除
                                                        v-col(cols='12')
                                                            p.mb-1  {{ item.content }}
                                // - mail -
                                // - mail -
                                v-tab-item.pa-3(key='mail' value='tab-3' :transition='false' :reverse-transition='false')
                                    v-row(no-gutters)
                                        v-col(cols='6')
                                            p.d-flex.align-center.input-has-label
                                                label 收件人
                                                v-autocomplete.py-1(v-model='addressee' :items='people' item-text='name' item-value='name' solo dense height='40' multiple chips)
                                                    template(v-slot:selection='data')
                                                        v-chip(v-bind="data.attrs"
                                                            :input-value="data.selected"
                                                            close outlined
                                                            @click="data.select"
                                                            @click:close="addresseeRemove(data.item)")
                                                            v-avatar(left)
                                                                v-img(:src='data.item.pic')
                                                            span {{ data.item.name }}
                                                    template(v-slot:item='data')
                                                        v-list-item-avatar.mr-2
                                                            img(:src='data.item.pic')
                                                        v-list-item-content
                                                            v-list-item-title(v-html='data.item.name')
                                        v-col(cols='6')
                                            p.d-flex.align-center.input-has-label
                                                label 副本
                                                v-autocomplete.py-1(v-model='copy' :items='people' item-text='name' item-value='name' solo dense height='40' multiple chips)
                                                    template(v-slot:selection='data')
                                                        v-chip(v-bind="data.attrs"
                                                            :input-value="data.selected"
                                                            close outlined
                                                            @click="data.select"
                                                            @click:close="copyRemove(data.item)")
                                                            v-avatar(left)
                                                                v-img(:src='data.item.pic')
                                                            span {{ data.item.name }}
                                                    template(v-slot:item='data')
                                                        v-list-item-avatar.mr-2
                                                            img(:src='data.item.pic')
                                                        v-list-item-content
                                                            v-list-item-title(v-html='data.item.name')
                                        v-col(cols='12')
                                            p.d-flex.align-center.input-has-label
                                                label 主旨
                                                v-text-field(solo height='36' dense)
                                        v-col.my-4(cols='12')
                                            vue-editor(v-model='mainEditor' @focus='onEditorFocus' @blur='onEditorBlur' @selection-change='onSelectionChange')
                                            .editor-custom-toolbar.text-right
                                                v-row.justify-end(no-gutters)
                                                    v-col(cols='3')
                                                        v-select.px-0(label='Email Template' v-model='choseEmailTemplate' :items='emailTemplateData' item-text='templateName' item-value='idx' height='40' clearable solo flat filled dense @change='selectTemplate')
                                                    v-col(cols='2')
                                                        v-menu(top :close-on-click='true' :close-on-content-click='false')
                                                            template(v-slot:activator='{ on, attrs }')
                                                                v-btn.px-3(v-bind='attrs' v-on='on' text :ripple='false')
                                                                    v-icon.mr-1(size='15') icon-add
                                                                    span Fields
                                                            v-card.emailFields(max-width='400')
                                                                v-tabs(v-model='emailTemplateTabs' hide-slider)
                                                                    v-tab.px-0(href="#tab-dollar" :ripple='false')
                                                                        v-icon(size='19') icon-dollar
                                                                    v-tab.px-0(href="#tab-user" :ripple='false')
                                                                        v-icon(size='19') icon-user-1
                                                                    v-tab.px-0(href="#tab-building" :ripple='false')
                                                                        v-icon(size='19') icon-building
                                                                v-tabs-items(v-model='emailTemplateTabs')
                                                                    v-tab-item(value='tab-dollar' transition='none')
                                                                        v-list.d-flex.flex-column(dense)
                                                                            v-select(label='Chose Val' v-model='emailTemplateDealValList' :items='emailTemplateContactValList' prepend-inner-icon='icon-box' height='40' clearable solo flat filled dense hide-details)
                                                                            hr.my-0.py-0
                                                                            v-text-field.mb-8(v-model='insertDealVal'  width='100%' height='40' color='grey lighten-2' prepend-inner-icon='icon-note' solo flat filled dense)
                                                                            v-btn.align-self-end(:ripple='false' @click='onEmailTemplateValChange(emailTemplateDealValList, insertDealVal)' width='100%' height='40' color='grey lighten-2' tile depressed dense)
                                                                                v-icon.mr-1(size='15') icon-add
                                                                                span Insert
                                                                    v-tab-item(value='tab-user' transition='none')
                                                                        v-list.d-flex.flex-column(dense)
                                                                            v-select(label='Chose Val' v-model='contactTemplateVal' :items='emailTemplateContactValList' prepend-inner-icon='icon-box' height='40' clearable solo flat filled dense hide-details)
                                                                            hr.my-0.py-0
                                                                            v-autocomplete.py-1(v-model='insertContactVal' :items='people' item-text='name' item-value='name' prepend-inner-icon='icon-user-1' solo flat filled dense height='40' multiple chips)
                                                                                template(v-slot:selection='data')
                                                                                    v-chip(v-bind="data.attrs" :input-value="data.selected" close outlined @click="data.select" @click:close="addresseeRemove(data.item)")
                                                                                        v-avatar(left)
                                                                                            v-img(:src='data.item.pic')
                                                                                        span {{ data.item.name }}
                                                                                template(v-slot:item='data')
                                                                                    v-list-item-avatar.mr-2
                                                                                        img(:src='data.item.pic')
                                                                                    v-list-item-content
                                                                                        v-list-item-title(v-html='data.item.name')
                                                                            v-btn.align-self-end(:ripple='false' @click='onEmailTemplateValChange(contactTemplateVal, insertContactVal)' width='100%' height='40' color='grey lighten-2' tile depressed dense)
                                                                                v-icon.mr-1(size='15') icon-add
                                                                                span Insert
                                                                    v-tab-item(value='tab-building' transition='none')
                                        v-col(cols='12')
                                            v-row.align-center(no-gutters)
                                                v-col(cols='10')
                                                    v-btn(@click width='120' height='40' color='primary' depressed dark)
                                                        span 傳送
                                                    v-btn.ml-2(@click width='120' height='40' color='grey lighten-1' depressed dark)
                                                        span 清除
                                // - News -
                                v-tab-item.pa-3(key='news' value='tab-4' :transition='false' :reverse-transition='false')
                                    v-card.d-inline-block.ma-3(max-width='300' v-for='item in newsPaper' :key='item.id' :to='item.href' flat)
                                        img(src='styles/images/new1.png' height='180')
                                        v-card-title.pa-0  {{ item.title }}
                                        v-card-text.text--primary.px-0.pb-0  {{ item.content }}
                    v-col.pt-4.pt-md-0.pl-md-4.min-pad-scroll(cols='12' md='4')
                        v-card.contact-card(flat)
                            v-card-title.d-flex.justify-space-between.align-center.px-3.py-2
                                .d-flex.align-center.my-0
                                    .cube-icon.small.bg-pink.mr-2
                                        v-icon(size='21' color='white') mdi-clock
                                    span 時間軸
                            v-card-text.py-0
                                v-tabs.borderBtn-tabs.pt-3(height='32' background-color='white' hide-slider show-arrows centered)
                                    v-tab(v-for='item in timeLineType' :key='item.key' :href='`#tab-${item.id}`')
                                        | {{ item.name }}
                                    // - Time Line - All -
                                    v-tab-item.pa-0.pt-4(key='all' value='tab-1' :transition='false' :reverse-transition='false')
                                        v-timeline.pt-0(dense align-top)
                                            v-timeline-item(v-for='(item, index) in timeLine' :key='index' color='success' :icon='item.icon' small right fill-dot)
                                                // - Time Line Item - Meeting and Call  -
                                                v-card.px-3.py-1(v-if="item.type === 'call' || item.type === 'meeting'" flat outlined)
                                                    v-row.justify-space-between.align-center(no-gutters)
                                                        v-col(cols='10')
                                                            v-card-subtitle.pa-0.t-black
                                                                | {{ item.title }}
                                                        v-col.text-right(cols='1')
                                                            v-menu(bottom left)
                                                                template(v-slot:activator='{ on, attrs }')
                                                                    v-btn(color='primary' dark v-bind='attrs' v-on='on' icon)
                                                                        v-icon(size='16')  icon-dot-3
                                                                v-list.pa-0
                                                                    v-list-item.px-0.text-center
                                                                        v-btn(@click='onEditAactivity(item)' text='text')
                                                                            span.ml-1 編輯
                                                                    v-list-item.px-0.text-center
                                                                        v-btn(@click='onDelete()' text='text')
                                                                            span.ml-1 刪除
                                                        v-col.f-smaller.t-lightgary.t-lightgary.detail.justify-start(cols='12')
                                                            v-row(no-gutters)
                                                                v-col.mb-2(cols='12')
                                                                    span.mr-3
                                                                        | {{ item.date }} ・
                                                                        | {{ item.owner }}
                                                                v-col.mb-1(cols='12')
                                                                    .d-inline-flex.align-center.mr-3
                                                                        v-icon(size='17') icon-group
                                                                        span  {{ item.client }}
                                                                    .d-inline-flex.align-center
                                                                        v-icon(size='15') icon-company
                                                                        span  {{ item.clientConpany }}
                                                // Time Line Item - note
                                                v-card.timeLine-note.px-3.py-1(v-if="item.type === 'note'" flat outlined)
                                                    v-row.justify-space-between.align-center(no-gutters)
                                                        v-col.f-smaller.t-lightgary.t-lightgary.d-flex.align-center(cols='10')
                                                            span.mr-3
                                                                | {{ item.date }} ・
                                                                | {{ item.owner }}
                                                        v-col.text-right(cols='1')
                                                            v-menu(bottom left)
                                                                template(v-slot:activator='{ on, attrs }')
                                                                    v-btn(color='primary' dark v-bind='attrs' v-on='on' icon)
                                                                        v-icon(size='16')  icon-dot-3
                                                                v-list.pa-0
                                                                    v-list-item.px-0.text-center
                                                                        v-btn(text='text')
                                                                            span.ml-1 編輯
                                                                    v-list-item.px-0.text-center
                                                                        v-btn(@click='onDetele(item)' text='text')
                                                                            span.ml-1 刪除
                                                        v-col(cols='12')
                                                            p.mb-1.t-black  {{ item.content }}
                                                // - Time Line Item - Mail  -
                                                v-card.px-3.py-1(v-if="item.type === 'mail'" flat outlined)
                                                    v-row.justify-space-between.align-center(no-gutters)
                                                        v-col.d-flex.align-center(cols='10')
                                                            v-card-subtitle.pa-0.t-black
                                                                | {{ item.title }}
                                                        v-col.text-right(cols='1')
                                                            v-menu(bottom left)
                                                                template(v-slot:activator='{ on, attrs }')
                                                                    v-btn(color='primary' dark v-bind='attrs' v-on='on' icon)
                                                                        v-icon(size='16')  icon-dot-3
                                                                v-list.pa-0
                                                                    v-list-item.px-0.text-center
                                                                        v-btn(text='text')
                                                                            span.ml-1 回信
                                                                    v-list-item.px-0.text-center
                                                                        v-btn(@click='onDetele(item)' text='text')
                                                                            span.ml-1 刪除
                                                        v-col.f-smaller.t-lightgary.d-flex.align-center(cols='12')
                                                            span.mr-3
                                                                | {{ item.date }} ・
                                                                | {{ item.owner }}
                                                        v-col(cols='12 mt-2')
                                                            p.mb-1  {{ item.content }}
                                    // - Time Line - mail -
                                    v-tab-item.pa-3.pt-5(key='mail' value='tab-2' :transition='false' :reverse-transition='false')
                                        v-timeline.pt-0(dense align-top)
                                            template(v-for='(item, index) in timeLine')
                                                v-timeline-item(v-if="item.type === 'mail'" :key='index' color='success' :icon='item.icon' small right fill-dot)
                                                    v-card.my-1.px-3.py-2(flat outlined)
                                                        v-row.justify-space-between.align-center(no-gutters)
                                                            v-col(cols='12' md='6')
                                                                v-card-subtitle.pa-0
                                                                    span  {{ item.title }}
                                                            v-col.f-smaller.t-lightgary.t-lightgary.detail.d-flex.align-center(cols='12' md='6')
                                                                span.mr-3
                                                                    | {{ item.date }} ・
                                                                    | {{ item.owner }}
                                    // - Time Line - note -
                                    v-tab-item.pa-3.pt-5(key='note' value='tab-3' :transition='false' :reverse-transition='false')
                                        v-timeline.pt-0(dense align-top)
                                            template(v-for='(item, index) in timeLine')
                                                v-timeline-item(v-if="item.type === 'note'" :key='index' color='success' :icon='item.icon' small right fill-dot)
                                                    v-card.timeLine-note.px-3.py-1(flat outlined)
                                                        v-row.justify-space-between.align-center(no-gutters)
                                                            v-col.f-smaller.t-lightgary.t-lightgary.d-flex.align-center(cols='10')
                                                                span.mr-3
                                                                    | {{ item.date }} ・
                                                                    | {{ item.owner }}
                                                            v-col.text-right(cols='1')
                                                                v-menu(bottom left)
                                                                    template(v-slot:activator='{ on, attrs }')
                                                                        v-btn.ml-3(color='primary' dark v-bind='attrs' v-on='on' icon)
                                                                            v-icon(size='16')  icon-dot-3
                                                                    v-list.pa-0
                                                                        v-list-item.px-0.text-center
                                                                            v-btn(text='text')
                                                                                span.ml-1 編輯
                                                                        v-list-item.px-0.text-center
                                                                            v-btn(@click='onDetele(item)' text='text')
                                                                                span.ml-1 刪除
                                                            v-col(cols='12')
                                                                p.mb-1 {{ item.content }}
        v-dialog(v-model='changeOwnDialog' max-width='500' persistent)
            change-own(@emitChangeOwnDialog='onEmitChangeOwnDialog')
        v-dialog(v-model='activityDialog' width='470' data-app='true' persistent)
            activity-dialog(@emitActivityDialog='onEmitActivityDialog')
        v-dialog(v-model='addDealDialog' max-width='500' persistent)
            add-deal(@emitAddDealDialog='onEmitAddDealDialog')
        v-dialog(v-model='toDealDialog' max-width='1200' persistent)
            to-deal(@emitToDealDialog='onEmitToDealDialog')
        v-dialog(v-model='editContactDetailDialog' max-width='500' persistent)
            edit-contact-detail(@emitEditContactDetailDialog='onEmitEditContactDetailDialog' :contactData='contactData')
        v-dialog(v-model='messageDialog' width='360' persistent content-class='statusDialog')
            message-dialog(@emitMessageDialog='onEmitMessageDialog' :message='message')
        v-dialog(v-model='successDialog' width='360' persistent content-class='statusDialog')
            success-dialog(@emitSuccessDialog='onEmitSuccessDialog')
        v-dialog(v-model='errorDialog' width='360' persistent content-class='statusDialog')
            error-dialog(@emitErrorDialog='onEmitErrorDialog' :errorMessage='errorMessage')
</template>

<script>
    import changeOwn from '@/components/Dialog/changeOwn';
    import editContactDetail from '@/components/Dialog/Contact/editContactDetail';
    import activityDialog from '@/components/Dialog/activityDialog';
    import messageDialog from '@/components/Dialog/messageDialog';
    import successDialog from '@/components/Dialog/successDialog';
    import errorDialog from '@/components/Dialog/errorDialog';
    import addDeal from '@/components/Dialog/Deal/addDeal';
    import toDeal from '@/components/Dialog/Deal/toDeal';
    import { VueEditor } from "vue2-editor";
    import _ from 'lodash';

    export default {
        components: {
            changeOwn,
            activityDialog,
            messageDialog,
            successDialog,
            errorDialog,
            addDeal,
            toDeal,
            editContactDetail,
            VueEditor
        },
        data() {
            return {
                loading: true,
                mainEditor: '',
                stepContent: true,
                tab: null,
                prevIcon: false,
                nextIcon: false,
                contactInfo: {
                    name: 'Andy Lu',
                    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8zBnWt2f48y_tUcLks0aMS14C1da4qOBjw&usqp=CAU',
                    job: '業務',
                    cell: '02-0000-0000',
                    extension: '#123',
                    phone: '0923-222-222',
                    mail: 'andy@cm2.io',
                    memo: '',
                    ownerName: 'James Campbell',
                    ownerNickName: 'JC',
                    ownerPic: 'https://cdn.vuetifyjs.com/images/john.jpg',
                    company: {
                        name: '鉅碩資產',
                        web: 'cm2.io',
                        cell: '02-0000-0000',
                        fax: '02-1111-1111',
                    },
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
                    ]
                },
                tabs: [{
                        id: 1,
                        key: 'detail',
                        name: '詳細資料'
                    },
                    {
                        id: 2,
                        key: 'note',
                        name: '備註'
                    },
                    {
                        id: 3,
                        key: 'mail',
                        name: '電郵'
                    },
                    {
                        id: 4,
                        key: 'news',
                        name: '新聞'
                    }
                ],
                timeLineType: [{
                        id: 1,
                        key: 'all',
                        name: '全部'
                    },
                    {
                        id: 2,
                        key: 'mail',
                        name: '電郵'
                    },
                    {
                        id: 3,
                        key: 'note',
                        name: '備註'
                    }
                ],
                timeLine: [{
                        type: 'call',
                        title: '與王先生電話會議',
                        icon: 'icon-cell',
                        date: '07/27',
                        owner: 'James Campbell',
                        client: '王先生',
                        clientConpany: 'Dealate',
                        isFinish: false
                    },
                    {
                        type: 'meeting',
                        title: '會議',
                        icon: 'icon-group',
                        date: '07/27',
                        owner: 'James Campbell',
                        client: '王先生',
                        clientConpany: 'Dealate',
                        isFinish: false
                    },
                    {
                        type: 'mail',
                        icon: 'icon-mail',
                        title: 'Fwd:星期一會議時間確認',
                        content: '會議時間為星期一',
                        mailTo: '',
                        send: '',
                        date: '07/27',
                        owner: 'James Campbell',
                        client: '王先生',
                        clientConpany: 'Dealate',
                    },
                    {
                        type: 'note',
                        icon: 'icon-note',
                        content: '不會考慮任何低於要價的報價。由 Janine K. 推薦。',
                        date: '07/27',
                        owner: 'James Campbell'
                    },
                ],
                breadcrumbs: [{
                        text: 'Companies',
                        disabled: false,
                        href: 'Companies.html',
                    },
                    {
                        text: '鉅碩資產',
                        disabled: true,
                        href: 'Account',
                    },
                ],
                contact: [{
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
                        name: 'Kay Chen',
                        nickName: 'KC',
                        job: 'CEO',
                        main: true,
                        pic: '',
                        phone: '0900-000-000',
                        email: 'key000@gmail.com',
                        company: '',
                    },
                    {
                        name: 'Mia Lu',
                        nickName: 'ML',
                        job: 'CEO',
                        main: true,
                        pic: 'https://cdn.vuetifyjs.com/images/john.jpg',
                        phone: '0900-000-000',
                        email: 'key000@gmail.com',
                        company: '',
                    }
                ],
                newsPaper: [{
                        id: 1,
                        title: '我們真的需要超過 12.9 吋的 iPad 嗎？',
                        content: '蘋果產品預測準確率頗高的彭博社作者 Mark Gurman 最近發文，表示蘋果正在探索更大尺寸的 iPad，也就是說未來新 iPad 可能會超越現在 iPad Pro 的 12.9 吋。14 吋，又或是 16 吋？',
                        pic: 'styles/images/new1.png',
                        href: '#',
                    },
                    {
                        id: 2,
                        title: 'WFH 成永久趨勢？曼哈頓商辦空置率創史上新高',
                        content: '蘋果產品預測準確率頗高的彭博社作者 Mark Gurman 最近發文，表示蘋果正在探索更大尺寸的 iPad，也就是說未來新 iPad 可能會超越現在 iPad Pro 的 12.9 吋。14 吋，又或是 16 吋？',
                        pic: 'styles/images/new2.png',
                        href: '#',
                    }
                ],
                showDetailEditBtn: true,
                isDetailReadonly: true,
                own: 'James Campbell',
                people: [
                    { name: 'James Campbell', pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8zBnWt2f48y_tUcLks0aMS14C1da4qOBjw&usqp=CAU'},
                    { name: 'Sunny Chen', pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=707b9c33066bf8808c934c8ab394dff6'},
                    { name: 'Jason Lu', pic: 'https://cdn.vuetifyjs.com/images/john.jpg'},
                    { name: 'Mandy Wang', pic: 'data:image/jpeg;base64,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'},
                ],
                addressee: [],
                copy: [],
                // Dialog
                addDealDialog: false,
                toDealDialog: false,
                changeOwnDialog: false,
                addContactDialog: false,
                editContactDetailDialog: false,
                contactData: '',
                activityDialog: false,
                messageDialog: false,
                message: '',
                successDialog: false,
                errorDialog: false,
                errorMessage: '',
                showDealsMore: false,
                choseEmailTemplate: '',
                emailTemplateData: [
                    {
                        idx: 1,
                        templateName: 'template 1',
                        createTime: '2021/10/20',
                        lastModifyTime: '2021/10/20',
                        templateContent: 'Hi Everyone. {{contact.owner}} {{deal.title}}',
                        contactTemplateVal: ['{{contact.owner}}'],
                        dealTemplateVal: ['{{contact.owner}}'],
                    }
                ],
                emailTemplateTabs:'',
                emailTemplateContactValList: [],
                insertContactVal: '',
                emailTemplateDealValList: [],
                insertDealVal: '',
                contactTemplateVal: '',
            }
        },
        mounted() {
            window.setTimeout(( () => this.loading = false), 1000);
        },
        methods: {
            onCall: function (cell) {
                return 'tel:'+cell;
            },
            onMall: function (mail) {
                return 'mailto:'+mail;
            },
            // About Deal
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
            onEditDetail: function() {
                this.showDetailEditBtn = false;
                this.isDetailReadonly = false;
            },
            cancelEditDetail: function() {
                this.showDetailEditBtn = true;
                this.isDetailReadonly = true;
            },
            confirmEditDetail: function() {
                this.showDetailEditBtn = true;
                this.isDetailReadonly = true;
            },
            // Dialog
            onChangeOwn() {
                this.changeOwnDialog = true;
            },
            onEmitChangeOwnDialog(val) {
                this.changeOwnDialog = false;
                if (val) {
                    this.showSussessDialog();
                }
            },
            onEditAactivity(data) {
                this.contactData = data;
                this.activityDialog = true;
            },
            onEmitActivityDialog(val) {
                this.activityDialog = false;
                if (val) {
                    this.showSussessDialog();
                }
            },
            showSussessDialog() {
                this.successDialog = true;
            },
            onEmitSuccessDialog() {
                this.successDialog = false;
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
            onDelete () {
                this.showMessageDialog('您確定要刪除此聯絡人嗎？');
            },
            onCopy() {
                this.showMessageDialog('您確定要複製此聯絡人嗎？');
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
            showEditContactDetail() {
                this.editContactDetailDialog = true;
            },
            onEmitEditContactDetailDialog(val) {
                this.editContactDetailDialog = false;
                if (val) {
                    this.showSussessDialog();
                }
            },
            // Dialog Area ----------------------------------------- [End]
            moreDeals() {
                if (this.showDealsMore == true) {
                    this.showDealsMore = false;
                } else {
                    this.showDealsMore = true;
                }
            },
            // chip remove
            addresseeRemove (item) {
                const index = this.addressee.indexOf(item.name)
                if (index >= 0) this.addressee.splice(index, 1)
            },
            copyRemove (item) {
                const index = this.copy.indexOf(item.name)
                if (index >= 0) this.copy.splice(index, 1)
            },
            // email Template Area ----------------------------------------- [Start]
            selectTemplate(v) {
                if (v) {
                    const selectTemplate = _.filter(this.emailTemplateData, { 'idx': v });
                    this.mainEditor = selectTemplate[0].templateContent;
                    this.emailTemplateContactValList = selectTemplate[0].contactTemplateVal;
                    this.emailTemplateDealValList = selectTemplate[0].dealTemplateVal
                } else {
                    this.mainEditor = '';
                    this.emailTemplateContactValList = '';
                    this.emailTemplateDealValList = '';
                }
            },
            onEditorBlur(quill) {
                console.log("editor blur!", quill);
            },

            onEditorFocus(quill) {
                console.log("editor focus!", quill);
            },

            onSelectionChange(range) {
                console.log("selection change!", range);
            },
            onEmailTemplateValChange(val, insertText) {
                if (val && insertText) {
                    this.mainEditor = this.mainEditor.replace(val, insertText);
                }
            }
            // email Template Area ----------------------------------------- [End]
        }
    }
</script>
<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
</style>