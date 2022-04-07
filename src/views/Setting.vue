<template lang='pug'>
#Setting.main-page.detail-page.px-12.py-6
	v-row
		v-col.pl-12(cols='12' md='3')
			h1.mt-2.mb-4 Setting
			v-tabs(v-model='tab' :vertical='isdesktop' hide-slider)
				v-tab.px-0(href='#PersonalPreferences' :ripple='false') Personal preferences
				v-tab.px-0(href='#PasswordAndLogin' :ripple='false') Password and Login
				v-tab.px-0(href='#EmailSync' :ripple='false') Email Sync
				v-tab.px-0(href='#EmailTemplate' :ripple='false') Email Template
				v-tab.px-0(href='#CompanySettings' :ripple='false') Company Settings
				v-tab.px-0(href='#ManageUsers' :ripple='false') Manage users
				v-tab.px-0(href='#CustomFields' :ripple='false') Custom Fields
				v-tab.px-0(href='#PipelineStageSetting' :ripple='false') Pipeline Stage Setting
		v-col.pl-md-0.pr-12(cols='12' md='9')
			v-tabs-items(v-model='tab')
				v-tab-item(value='PersonalPreferences' transition='none')
					h3.d-flex.align-center.setting-title.px-4.py-3
						.cube-icon.small.bg-primary.mr-3
							v-icon(size='18' color='white') icon-user
						span Personal preferences
					.setting-inner
						h4.text-h6.mb-4 General
						p
							label Your name
							v-row(no-gutters)
								v-col.pr-2(cols='6')
									v-text-field(v-model='personal.firstName' solo dense label='First Name')
								v-col.pl-2(cols='6')
									v-text-field(v-model='personal.lastName' solo dense label='Last Name')
						p
							label(for='personalMail') Email
							v-row.align-center(no-gutters)
								v-col.pr-2(cols='11')
									v-text-field#personalMail(v-model='personal.mail' type='mail' :disabled='personal.mailDisabled' solo dense)
								v-col.pl-2(cols='1')
									v-btn(v-if='personal.mailDisabled' icon @click='personal.mailDisabled = false')
										v-icon(size='20') icon-edit
									v-btn(v-else icon @click='personal.mailDisabled = true')
										v-icon(size='20') icon-cancel
						p
							label(for='personalLanguage') Language
							v-select#personalLanguage(v-model='personal.language' :items='languageList' solo dense)
						p
							label(for='personalCurrency') Default currency
							v-row.align-center(no-gutters)
								v-col.pr-2(cols='11')
									v-select#personalCurrency(v-model='personal.currency' :items='currencyList' :disabled='personal.currencyDisabled' solo dense)
								v-col.pl-2(cols='1')
									v-btn(v-if='personal.currencyDisabled' icon @click='personal.currencyDisabled = false')
										v-icon(size='20') icon-edit
									v-btn(v-else icon @click='personal.currencyDisabled = true')
										v-icon(size='20') icon-cancel
						v-row.mt-10.justify-center(no-gutters)
							v-col(cols='12' md='6')
								v-btn(:ripple='false' width='100%' height='45' color='success' depressed dark) Save

				v-tab-item(value='PasswordAndLogin' transition='none')
					h3.d-flex.align-center.setting-title.px-4.py-3
						.cube-icon.small.bg-primary.mr-3
							v-icon(size='19' color='white') icon-padlock
						span Password and Login
					.setting-inner
						h4.text-h6.mb-2 Change password
						p.text-gary.mb-8 Keep your data safe by creating a password that is complex and long enough. It should be easy for you to remember but hard for others to guess.
						p
							label Current password
							v-text-field(v-model='password.current' type='password' solo dense)
						p
							label New password
							v-text-field(v-model='password.new' type='password' solo dense)
							span.mt-2.blue-grey--text.lighten-2--text.text-caption min 8 characters
						p
							label Confirm password
							v-text-field(v-model='password.confirm' type='password' solo dense)
						v-row.mt-10.justify-center(no-gutters)
							v-col(cols='12' md='6')
								v-btn(:ripple='false' width='100%' height='45' color='success' depressed dark) Save
				v-tab-item(value='EmailSync' transition='none')
					v-row.setting-title.align-center.px-4.py-3(no-gutters)
						v-col(cols='12' sm='9' xl='10')
							h3.d-flex.align-center
								.cube-icon.small.bg-primary.mr-3
									v-icon(size='19' color='white') icon-mail
								span Email Sync
						v-col.text-md-right(cols='12' sm='3' xl='2')
							v-btn(@click='showAddEmail' width='100%' height='40' color='green' depressed dark)
								v-icon.mr-1(size='14') icon-add
								span Add New Account
					.setting-inner(v-if='notEmailSetting')
						p Tab switching and manually forwarding emails to CRM is a thing of the past. When unlocked, you can use your Sales Inbox to send email directly from CRM while automatically linking them to related deals and contacts.
						p
							v-icon.mr-2(color='primary' size='20') icon-check
							span Sync CRM emails with any major email provider
						p
							v-icon.mr-2(color='primary' size='20') icon-check
							span Track email opens and clicks
						p
							v-icon.mr-2(color='primary' size='20') icon-check
							span Save time by making use of customizable templates
						p
							v-icon.mr-2(color='primary' size='20') icon-check
							span Customize your signature for a more professional look
						hr
						br
						h4 Smart email BCC address
						p Add your Smart BCC address to the Cc or Bcc line when emailing customers or forward incoming emails to this address to automatically copy your emails to CRM.
						v-chip(color='primary') abc@crm.io
						br
						br
						h4 Default email sharing
						v-radio-group(v-model='emailSharing')
							v-radio.pt-4(value='1' label='Share all my linked email conversations with others in my company')
							p.text-caption Email conversations will be visible to others only when they are linked to contacts and deals in CRM.
							v-radio.pt-0(value='2' label='Keep all my email conversations private')
							p.text-caption Email conversations can still be linked to contacts and deals in CRM, but they will only be visible to you.
						br
						p You can mark specific emails Shared or Private at any time to override this setting.
						h4 Link emails to leads and deals
						v-radio-group(v-model='emailLink')
							v-radio.pt-4(value='1' label='Link emails manually')
							v-radio.pt-0(value='2' label='Automatically link emails to leads or deals')
							p.text-caption CRM will look for an open lead or deal related to the contact person the email was sent to or received from. When only one open lead or deal is found that matches the contact person, the email will be linked to it automatically.
					.setting-inner(v-else)
						h4 Email sync
						v-card.my-4(outlined flat)
							v-row.align-center(no-gutters)
								v-col(cols='9')
									v-list-item
										v-list-item-avatar
											v-img(src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST1EmUdbH4RWGrWUTjmrYT295uwgZYbzTKcYiDkZEJiZ6OtWAm6c3AFLrI-raT3_8FLTI&usqp=CAU')
										v-list-item-content
											v-list-item-title abc@gmail.com
											v-list-item-subtitle
												v-icon(color='success') icon-check
												span Active
								v-col.pr-4(cols='3')
									v-btn(@click='stopSyncing' width='100%' height='40' color='red' depressed dark)
										span Stop syncing
						p Having trouble with your email sync? Learn more from the article Troubleshooting the Email Sync
						h4 Labels
						v-radio-group(v-model='emailSharing')
							v-radio.pt-4(value='1' label='All emails will be synced with CRM')
							v-radio.pt-0(value='2' label='Only emails with certain labels will be synced with CRM')
						h4.mt-4.mb-2 Archive and Delete
						v-switch(color='primary' label='Archive in my email client when archiving in CRM' value='true' hide-details)
						v-switch(color='primary' label='Delete from my email client when deleting from CRM' value='true' hide-details)
						p.text-caption.mt-2 Archiving emails in your email client will not archive emails in CRM.#[br]Deleting emails in your email client will always delete emails in CRM.
						br
						br
						h4.mt-4.mb-2 Email tracking
						v-switch(color='primary' label='Open tracking' value='true' hide-details)
						p.text-caption.mt-1.mb-3 Track when email messages have been opened by recipients.
						v-switch(color='primary' label='Link tracking' value='true' hide-details)
						p.text-caption.mt-1.mb-3 Track when links in email messages have been clicked by recipients.
						v-switch(color='primary' label='Notifications for tracking activities' value='true' hide-details)
						p.text-caption.mt-1.mb-3 Get in-app notifications about open and link tracking activities.
						br
						br
						h4 Email links
						p When you click an email link in CRM, you can either open it in CRM or use the default email app in your computer.
						v-radio-group(v-model='emailLink')
							v-radio.pt-4(value='1' label='Open email links in Pipedrive (recommended)')
							v-radio.pt-0(value='2' label='Use the default email app in my computer to open email links')
				v-tab-item(value='EmailTemplate' transition='none')
					v-row.setting-title.align-center.px-4.py-3(no-gutters)
						v-col(cols='6')
							h3.d-flex.align-center
								.cube-icon.small.bg-primary.mr-3
									v-icon(size='19' color='white') icon-mail
								span Email Template
						v-col.text-md-right(cols='6')
							span.blue-grey--text.lighten-2--text.text-body-2 10 Templates
					.px-4.py-3
						v-row.align-center.justify-space-between.mb-2(no-gutters)
							v-col(cols='4')
								v-text-field.pa-0(v-model='searchTemplate' flat dense solo height='40' min-height='40' prepend-inner-icon='icon-search')
							v-col.pl-4(cols='2')
								v-btn(@click='showAddTemplateDialog' width='100%' height='40' color='green' depressed dark)
									v-icon.mr-1(size='14') icon-add
									span Add Template
						v-data-table.dashboard-table(:headers='mangeTemplateHeaders' :items='mangeTemplateData' :items-per-page='itemPerPage' :page.sync='page' @page-count='pageCount = $event' :search='searchTemplate' height='100%' show-select hide-default-footer='hide-default-footer' dense)
							template(v-slot:item.user='{ item }')
								v-list-item
									a(href='/Account')
										v-list-item-avatar
											v-img(:src='item.pic')
									v-list-item-content
										v-row(no-gutters)
											v-col.text-left(cols='8')
												a.t-black(href='/Account')
													v-list-item-title.mb-1 {{ item.firstName }} {{ item.lastName }}
												a.text-left.text-caption(:href='onMall(item.mail)' color='primary' text) {{ item.mail }}
							template(v-slot:item.active='{ item }')
								v-btn(icon @click='showEditTemplateDialog(item)')
									v-icon(size='18') icon-edit
								v-btn(icon @click='onDelete')
									v-icon(size='18') icon-remove
							v-pagination.py-1.mb-3(v-model='page' :length='pageCount' circle)
				v-tab-item(value='CompanySettings' transition='none')
					h3.d-flex.align-center.setting-title.px-4.py-3
						.cube-icon.small.bg-primary.mr-3
							v-icon(size='19' color='white') icon-companies-b
						span Company Settings
					.setting-inner
						p
							label Company name
							v-text-field(v-model='company.name' type='text' solo dense)
						p
							label Company domain
							v-row.align-center(no-gutters)
								v-col.pr-2(cols='11')
									v-text-field(v-model='company.domain' :disabled='company.domainDisabled' type='text' solo dense)
									span.mt-2.blue-grey--text.lighten-2--text.text-caption The company domain name is used for the Smart BCC address and your account's address on the web app.
								v-col.pl-2(cols='1')
									v-btn(v-if='company.domainDisabled' icon @click='company.domainDisabled = false')
										v-icon(size='20') icon-edit
									v-btn(v-else icon @click='company.domainDisabled = true')
										v-icon(size='20') icon-cancel
						v-row.mt-10.justify-center(no-gutters)
							v-col(cols='12' md='6')
								v-btn(:ripple='false' width='100%' height='45' color='success' depressed dark) Save
				v-tab-item(value='ManageUsers' transition='none')
					v-row.setting-title.align-center.px-4.py-3(no-gutters)
						v-col(cols='12' md='8')
							h3.d-flex.align-center
								.cube-icon.small.bg-primary.mr-3
									v-icon(size='17' color='white') icon-contact
								span Manage users
						v-col.text-md-right(cols='12' md='4')
							span.blue-grey--text.lighten-2--text.text-body-2 2 / 3 seats available
					.px-4.py-3
						v-row.align-center(no-gutters)
							v-col(cols='6')
								v-btn-toggle(v-model.lazy='mangeUserShow' color='primary accent-3' exclusive group @change='changeActive')
									v-btn.mx-0(:value='true' height='40') Active(2)
									v-btn.mx-0(:value='false' height='40') Deactivated(0)
							v-col(cols='4')
								v-text-field.pa-0(v-model='searchMangeUser' flat dense solo height='40' min-height='40' prepend-inner-icon='icon-search')
							v-col.pl-4(cols='2')
								v-btn(@click='showAddUserDialog' width='100%' height='40' color='green' depressed dark)
									v-icon.mr-1(size='14') icon-add
									span Add User
						v-data-table.dashboard-table(:headers='mangeUserHeaders' :items='mangeUserShowData' :items-per-page='itemPerPage' :page.sync='page' @page-count='pageCount = $event' :search='searchMangeUser' height='100%' hide-default-footer='hide-default-footer' dense)
							template(v-slot:item.user='{ item }')
								v-list-item
									a(href='/Account')
										v-list-item-avatar
											v-img(:src='item.pic')
									v-list-item-content
										v-row(no-gutters)
											v-col.text-left(cols='8')
												a.t-black(href='/Account')
													v-list-item-title.mb-1 {{ item.firstName }} {{ item.lastName }}
												a.text-left.text-caption(:href='onMall(item.mail)' color='primary' text) {{ item.mail }}
							template(v-slot:item.active='{ item }')
								v-btn(icon @click='showEditUserDialog(item)')
									v-icon(size='18') icon-edit
								v-btn(icon @click='onDelete')
									v-icon(size='18') icon-remove
							v-pagination.py-1.mb-3(v-model='page' :length='pageCount' circle)
				v-tab-item(value='CustomFields' transition='none')
					v-row.setting-title.align-center.px-4.py-3(no-gutters)
						v-col(cols='12' md='9')
							h3.d-flex.align-center
								.cube-icon.small.bg-primary.mr-3
									v-icon(size='19' color='white') icon-folder
								span Custom Fields
						v-col.text-md-right(cols='12' md='3')
							v-btn(@click='showAddCustomField' width='200' height='40' color='green' depressed dark)
								v-icon.mr-1(size='14') icon-add
								span Add Custom Field
					.px-4.py-3
						section
							h3 Deals
							v-data-table.dashboard-table(:headers='dataFieldsHeader' :items='dataFieldsData' :items-per-page='itemPerPage' :page.sync='page' @page-count='pageCount = $event' :search='searchMangeUser' height='200' hide-default-footer='hide-default-footer' dense)
								template(v-slot:item.active='{ item }')
									v-btn(icon @click='')
										v-icon(size='18') icon-edit
									v-btn.ml-4(icon @click='onDelete')
										v-icon(size='18') icon-remove
						section
							h3 Contact
							v-data-table.dashboard-table(:headers='dataFieldsHeader' :items='dataFieldsData' :items-per-page='itemPerPage' :page.sync='page' @page-count='pageCount = $event' :search='searchMangeUser' height='200' hide-default-footer='hide-default-footer' dense)
								template(v-slot:item.active='{ item }')
									v-btn(icon @click='')
										v-icon(size='18') icon-edit
									v-btn.ml-4(icon @click='onDelete')
										v-icon(size='18') icon-remove
						section
							h3 Organization
							v-data-table.dashboard-table(:headers='dataFieldsHeader' :items='dataFieldsData' :items-per-page='itemPerPage' :page.sync='page' @page-count='pageCount = $event' :search='searchMangeUser' height='200' hide-default-footer='hide-default-footer' dense)
								template(v-slot:item.active='{ item }')
									v-btn(icon @click='')
										v-icon(size='18') icon-edit
									v-btn.ml-4(icon @click='onDelete')
										v-icon(size='18') icon-remove
				v-tab-item(value='PipelineStageSetting' transition='none')
					v-row.setting-title.align-center.px-4.py-3(no-gutters)
						v-col(cols='12' md='9')
							h3.d-flex.align-center
								.cube-icon.small.bg-primary.mr-3
									v-icon(size='19' color='white') icon-step
								span Pipeline Stage Setting
						v-col.text-md-right(cols='12' md='3')
							v-btn(@click='showAddStageDialog' width='140' height='40' color='green' depressed dark)
								v-icon.mr-1(size='14') icon-add
								span Add Stage
					.px-5.py-5
						p.text-gary.mb-6 Manage candidates by setting up a hiring pipeline for this job.
						v-card.process-setting-item(flat v-for='(item, index) in stageList' :key='index')
							v-row.align-center(no-gutters)
								v-col(cols='10')
									h3.process-setting-item-title {{ item.processName }}
								v-col.text-right(cols='2')
									v-btn.ml-auto(color='gary' rounded icon @click='showEditStageDialog(item)')
										v-icon(size='20') icon-edit
									v-btn.ml-3(color='gary' rounded icon @click='onDelete')
										v-icon(size='20') icon-remove
								v-col.mt-2(cols='12')
									v-stepper-header.process-bar
										v-stepper-step(v-for='(subItem, index) in item.steps' :step='index' :class='subItem.color' :key='index')
											span {{ subItem.name }}

	v-dialog(v-model='messageDialog' width='360' persistent content-class='statusDialog')
		message-dialog(@emitMessageDialog='onEmitMessageDialog' :message='message')
	v-dialog(v-model='mangeUserAddDialog' max-width='500' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-center.mb-4 Add User
			v-card-text
				v-form(v-model='addUser.valid' ref='form')
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-text-field(v-model='addUser.firstName' label='First Name' solo)
						v-col.pl-2(cols='6')
							v-text-field(v-model='addUser.lastName' label='First Name' solo)
						v-col.mt-5(cols='12')
							v-text-field(v-model='addUser.role' label='Role' solo)
						v-col.mt-5(cols='12')
							v-text-field(v-model='addUser.mail' type='mail' label='E-mail' solo)
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='mangeUserAddDialog = false' width='100%' height='40' color='cancel' depressed dark) 取消
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onUserAdd' width='100%' height='40' color='success' depressed dark) 新增
	v-dialog(v-model='mangeUserEditDialog' max-width='500' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-center.mb-4 Edit User
			v-card-text
				v-form(v-model='editUser.valid' ref='form')
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-text-field(v-model='editUser.firstName' label='First Name' solo)
						v-col.pl-2(cols='6')
							v-text-field(v-model='editUser.lastName' label='First Name' solo)
						v-col.pl-2(cols='6')
							v-text-field(v-model='editUser.role' label='Role' solo)
						v-col.mt-5(cols='12')
							v-text-field(v-model='editUser.mail' type='mail' label='E-mail' solo)
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='mangeUserEditDialog = false' width='100%' height='40' color='cancel' depressed dark) 取消
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onUserEdit' width='100%' height='40' color='success' depressed dark) 新增
	v-dialog(v-model='customFieldAddDialog' max-width='500' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-center.mb-4 Add Custom Field
			v-card-text
				v-form(v-model='adddCustomField.valid' ref='form')
					v-select.mb-4(v-model='adddCustomField.page' :items='pageLists' solo label='Use Page')
					v-text-field.mb-4(v-model='adddCustomField.fieldName' type='text' label='Field Name' solo)
					v-select.mb-4(v-model='adddCustomField.type' :items='fieldTypes' label='Field Type' solo)
					div(v-if="adddCustomField.type === 'Select'")
						.text-h6.mb-4 Options
						v-textarea(solo)
					div(v-if="adddCustomField.type === 'Radio'")
						.text-h6.mb-4 Options
						v-textarea(solo)
					div(v-if="adddCustomField.type === 'Checkbox'")
						.text-h6.mb-4 Options
						v-textarea(solo)
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='customFieldAddDialog = false' width='100%' height='40' color='cancel' depressed dark) 取消
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onCustomFieldAdd' width='100%' height='40' color='success' depressed dark) 新增
	v-dialog(v-model='mangeStageAddDialog' max-width='500' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-space-between.mt-2.mb-4
				h3 Add Stage
				v-btn.ml-3.add-deal-btn(v-if='addStage.steps.length <= 10' @click='addStageInput' width='40' height='40' :ripple='false' color='success' depressed dark fab rounded)
					v-icon(size='16') icon-add
			v-card-text
				v-form(v-model='addStage.valid' ref='form')
					v-row.align-center.mt-1.mb-4(no-gutters)
						v-col(cols='12')
							v-text-field(v-model='addStage.name' solo dense label='Stage Name')
					draggable(:list='addStage.steps' :move='checkMove' @start='addStage.dragging = true' @end='addStage.dragging = false')
						v-card.process-setting-item(flat v-for='(item, index) in addStage.steps' :key='index')
							v-row.align-center.my-0(no-gutters)
								v-col.d-flex.align-center(cols='1')
									v-icon.mr-1(size='18') icon-drag
								v-col.pr-2(cols='6')
									v-text-field(v-model='item.name' solo dense label='Step Name')
								v-col.pl-2(cols='5')
									v-select(v-model='item.color' :items='stageColorLists' solo dense label='Color')
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='mangeStageAddDialog = false' width='100%' height='40' color='cancel' depressed dark) 取消
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onStageAdd' width='100%' height='40' color='success' depressed dark) 新增
	v-dialog(v-model='mangeStageEditDialog' max-width='500' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-space-between.mt-2.mb-4
				h3 Edit Stage
				v-btn.ml-3.add-deal-btn(v-if='editStage.steps.length <= 10' @click='addStageInput' width='40' height='40' :ripple='false' color='success' depressed dark fab rounded)
					v-icon(size='16') icon-add
			v-card-text
				v-form(v-model='editStage.valid' ref='form')
					v-row.align-center.mt-1.mb-4(no-gutters)
						v-col(cols='12')
							v-text-field(v-model='editStage.name' solo dense label='Stage Name')
					draggable(v-if='editStage.steps.length >= 1' :list='editStage.steps' :move='checkMove' @start='editStage.dragging = true' @end='editStage.dragging = false')
						v-card.process-setting-item(flat v-for='(item, index) in editStage.steps' :key='index')
							v-row.align-center.my-0(no-gutters)
								v-col.d-flex.align-center(cols='1')
									v-icon.mr-1(:color='lightGary' size='18') icon-drag
								v-col.pr-2(cols='6')
									v-text-field(v-model='item.name' solo dense label='Step Name')
								v-col.pl-2(cols='5')
									v-select(v-model='item.color' :items='stageColorLists' solo dense label='Color')
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='mangeStageEditDialog = false' width='100%' height='40' color='cancel' depressed dark) 取消
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onStageEdit' width='100%' height='40' color='success' depressed dark) 新增
	v-dialog(v-model='connectEmailAccountDialog' max-width='500' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-center.mb-4 Connect Email Account
			v-card-text
				v-form(v-model='connectEmail.valid' ref='form')
					v-row(no-gutters)
						v-col.pr-2(cols='12')
							v-text-field(v-model='connectEmail.emailAddress' label='Email Address' solo)
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='connectEmailAccountDialog = false' width='100%' height='40' color='cancel' depressed dark) 取消
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onEmailAccountAdd' width='100%' height='40' color='success' depressed dark) 新增
	v-dialog(v-model='connectEmailAccountSettingDialog' max-width='560' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-center.mb-4 Which emails should be synced?
			v-card-text
				p.text-caption
					span You're about to connect
					strong abc@gmail.com
					span with CRM.
				v-form(v-model='connectEmail.valid' ref='form')
					h4 Sync emails with:
					v-radio-group(v-model='syncEmailWith')
						v-radio.pt-4(value='1' label='All emails will be synced with CRM')
						v-radio.pb-4(value='2' label='Only emails with certain labels will be synced with CRM')
					h4.mt-2 Sync starting from:
					v-radio-group(v-model='syncStartFrom')
						v-radio.pt-4(value='1' label='Now')
						v-radio.pt-0(value='2' label='1 month ago')
						v-radio.pt-0(value='3' label='3 month ago')
						v-radio.pb-4(value='4' label='6 month ago')
					h4.mt-2 Sync past emails sent to and received from:
					v-radio-group(v-model='syncReceivedFrom')
						v-radio.pt-4(value='1' label='CRM contacts only')
						v-radio.pb-4(value='2' label='All people')
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='connectEmailAccountSettingDialog = false' width='100%' height='40' color='cancel' depressed dark) Cancel
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onEmailSync' width='100%' height='40' color='success' depressed dark) Start Syncing
	v-dialog(v-model='manageAddTemplateDialog' max-width='900' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-center.mb-4 Add Email Template
			v-card-text
				v-form(v-model='addTemplate.valid' ref='form')
					v-row(no-gutters)
						v-col.mb-4(cols='12')
							v-text-field(v-model='addTemplate.templateName' label='Template Name' solo)
						v-col(cols='12')
							vue-editor(v-model='addTemplate.templateContent' ref="editor" @focus='onEditorFocus' @blur='onEditorBlur' @selection-change='onSelectionChange')
							.editor-custom-toolbar.text-right
								v-menu(top :close-on-click='true' :close-on-content-click='false')
									template(v-slot:activator='{ on, attrs }')
										v-btn.px-3(v-bind='attrs' v-on='on' text :ripple='false')
											v-icon.mr-1(size='15') icon-add
											span Fields
									v-card.emailFields
										v-tabs(v-model='addEmailTemplateTabs' hide-slider)
											v-tab.px-0(href="#tab-time" :ripple='false')
												v-icon(size='19') icon-time
											v-tab.px-0(href="#tab-dollar" :ripple='false')
												v-icon(size='19') icon-dollar
											v-tab.px-0(href="#tab-user" :ripple='false')
												v-icon(size='19') icon-user-1
											v-tab.px-0(href="#tab-building" :ripple='false')
												v-icon(size='19') icon-building
											v-tab.px-0(href="#tab-dots" :ripple='false')
												v-icon(size='19') icon-dots
										v-tabs-items(v-model='addEmailTemplateTabs')
											v-tab-item(value='tab-time' transition='none')
											v-tab-item(value='tab-dollar' transition='none')
												v-list.d-flex.flex-column(dense)
													v-btn(text @click="addEmailTemplateFields('deal.title')") Title
													v-btn(text @click="addEmailTemplateFields('deal.owner')") Owner
													v-btn(text @click="addEmailTemplateFields('deal.organization')") Organization
													v-btn(text @click="addEmailTemplateFields('deal.value')") Value
													v-btn(text @click="addEmailTemplateFields('deal.contactPerson')") Contact person
													v-btn(text @click="addEmailTemplateFields('deal.pipeline')") Pipeline
													v-btn(text @click="addEmailTemplateFields('deal.stage')") Stage
													v-btn(text @click="addEmailTemplateFields('deal.discount')") Discount %
											v-tab-item(value='tab-user' transition='none')
												v-list.d-flex.flex-column(dense)
													v-btn(text @click="addEmailTemplateFields('contact.fullName')") Full Name
													v-btn(text @click="addEmailTemplateFields('contact.LastName')") Last Name
													v-btn(text @click="addEmailTemplateFields('contact.owner')") Owner
													v-btn(text @click="addEmailTemplateFields('contact.organization')") Organization
													v-btn(text @click="addEmailTemplateFields('contact.email')") Email
													v-btn(text @click="addEmailTemplateFields('contact.phone')") Phone
													v-btn(text @click="addEmailTemplateFields('contact.birthday')") Birthday
													v-btn(text @click="addEmailTemplateFields('contact.homeAddress')") Home address
													v-btn(text @click="addEmailTemplateFields('contact.jobTitle')") Job Title
											v-tab-item(value='tab-building' transition='none')
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='manageAddTemplateDialog = false' width='100%' height='40' color='cancel' depressed dark) 取消
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onEmailTemplateAdd' width='100%' height='40' color='success' depressed dark) 新增
	v-dialog(v-model='manageEditTemplateDialog' max-width='900' content-class='setting-dialog')
		v-card
			v-card-title.d-flex.justify-center.mb-4 Edit Email Template
			v-card-text
				v-form(v-model='editTemplate.valid' ref='form')
					v-row(no-gutters)
						v-col.mb-4(cols='12')
							v-text-field(v-model='editTemplate.templateName' label='Template Name' solo)
						v-col(cols='12')
							vue-editor(v-model='editTemplate.templateContent')
							.editor-custom-toolbar.text-right
								v-menu(top :close-on-click='true' :close-on-content-click='false')
									template(v-slot:activator='{ on, attrs }')
										v-btn.px-3(v-bind='attrs' v-on='on' text :ripple='false')
											v-icon.mr-1(size='15') icon-add
											span Fields
									v-card.emailFields
										v-tabs(v-model='addEmailTemplateTabs' hide-slider)
											v-tab.px-0(href="#tab-time" :ripple='false')
												v-icon(size='19') icon-time
											v-tab.px-0(href="#tab-dollar" :ripple='false')
												v-icon(size='19') icon-dollar
											v-tab.px-0(href="#tab-user" :ripple='false')
												v-icon(size='19') icon-user-1
											v-tab.px-0(href="#tab-building" :ripple='false')
												v-icon(size='19') icon-building
											v-tab.px-0(href="#tab-dots" :ripple='false')
												v-icon(size='19') icon-dots
										v-tabs-items(v-model='addEmailTemplateTabs')
											v-tab-item(value='tab-time' transition='none')
											v-tab-item(value='tab-dollar' transition='none')
												v-list.d-flex.flex-column(dense)
													v-btn(text @click="addEmailTemplateFields('deal.title')") Title
													v-btn(text @click="addEmailTemplateFields('deal.owner')") Owner
													v-btn(text @click="addEmailTemplateFields('deal.organization')") Organization
													v-btn(text @click="addEmailTemplateFields('deal.value')") Value
													v-btn(text @click="addEmailTemplateFields('deal.contactPerson')") Contact person
													v-btn(text @click="addEmailTemplateFields('deal.pipeline')") Pipeline
													v-btn(text @click="addEmailTemplateFields('deal.stage')") Stage
													v-btn(text @click="addEmailTemplateFields('deal.discount')") Discount %
											v-tab-item(value='tab-user' transition='none')
												v-list.d-flex.flex-column(dense)
													v-btn(text @click="addEmailTemplateFields('contact.fullName')") Full Name
													v-btn(text @click="addEmailTemplateFields('contact.LastName')") Last Name
													v-btn(text @click="addEmailTemplateFields('contact.owner')") Owner
													v-btn(text @click="addEmailTemplateFields('contact.organization')") Organization
													v-btn(text @click="addEmailTemplateFields('contact.email')") Email
													v-btn(text @click="addEmailTemplateFields('contact.phone')") Phone
													v-btn(text @click="addEmailTemplateFields('contact.birthday')") Birthday
													v-btn(text @click="addEmailTemplateFields('contact.homeAddress')") Home address
													v-btn(text @click="addEmailTemplateFields('contact.jobTitle')") Job Title
											v-tab-item(value='tab-building' transition='none')
				v-card-actions.mt-8.px-0.py-0
					v-row(no-gutters)
						v-col.pr-2(cols='6')
							v-btn(:ripple='false' @click='manageEditTemplateDialog = false' width='100%' height='40' color='cancel' depressed dark) 取消
						v-col.pl-2(cols='6')
							v-btn(:ripple='false' @click='onEmailTemplateEdit(editTemplate)' width='100%' height='40' color='success' depressed dark) 確認
</template>

<script>
import _ from 'lodash';
import messageDialog from '@/components/Dialog/messageDialog';
import draggable from 'vuedraggable';
import { VueEditor } from "vue2-editor";

export default {
	name: 'Setting',
	components: {
		messageDialog,
		draggable,
		VueEditor
	},
	data() {
		return {
			isdesktop: true,
			tab: null,
			languageList: ['繁體中文','English'],
			currencyList: ['TWD(新台幣)','USD(美元)'],
			personal: {
				firstName: 'James',
				lastName: 'Campbell',
				mail: 'James@gmail.com',
				mailDisabled: true,
				currency: 'TWD(新台幣)',
				currencyDisabled: true,
				language: 'English',
			},
			password: {
				current: '',
				new: '',
				confirm: '',
			},
			company: {
				name: 'CM Square',
				domain: 'cm2.io',
				domainDisabled: true,
			},
			// table setting
			page: 1,
			pageCount: 1,
			itemPerPage: 12,
			mangeUserHeaders: [
				{  text: 'User', value: 'user', align: 'center', width: 300 },
				{  text: 'Role', value: 'role', align: 'center' },
				{  text: 'Last Login', value: 'lastLogin', align: 'center' },
				{  text: 'active', value: 'active', align: 'center', width: 120 },
			],
			mangeUserDesserts: [
				{
					pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=707b9c33066bf8808c934c8ab394dff6',
					firstName: 'James',
					lastName: 'Wu',
					mail: 'JamesCampbell@gmail.com',
					role: 'Salesman',
					lastLogin: '2021/11/19 22:55',
					active: true,
				},
				{
					pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=707b9c33066bf8808c934c8ab394dff6',
					firstName: 'James',
					lastName: 'Wu',
					mail: 'JamesCampbell@gmail.com',
					role: 'Salesman',
					lastLogin: '2021/11/19 22:55',
					active: true,
				},
				{
					pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=707b9c33066bf8808c934c8ab394dff6',
					firstName: 'James',
					lastName: 'Wu',
					mail: 'JamesCampbell@gmail.com',
					role: 'Salesman',
					lastLogin: '2021/11/19 22:55',
					active: false,
				}
			],
			mangeUserShow: true,
			mangeUserShowData: [],
			searchMangeUser: '',
			mangeUserAddDialog: false,
			addUser : {
				valid: true,
				firstName: '',
				lastName: '',
				role: '',
				mail: '',
			},
			mangeUserEditDialog: false,
			editUser : {
				valid: true,
				firstName: '',
				lastName: '',
				role: '',
				mail: '',
			},
			dataFieldsHeader: [
				{  text: 'Field Name', value: 'fieldName', align: 'center' },
				{  text: 'Field Type', value: 'fieldType', align: 'center' },
				{  text: 'Options', value: 'fieldType', align: 'center' },
				{  text: 'Active', value: 'active', align: 'center', width: 120 },
			],
			dataFieldsData: [],
			pageLists: ['Deals','Contact','Organization'],
			fieldTypes: [ 'Text','Long Text','Number','Date','Switch','Select','Radio','Checkbox'],
			adddCustomField: {
				valid: true,
				page: '',
				fieldName: '',
				fieldType: '',
			},
			customFieldAddDialog: false,
			// Dialog
			messageDialog: false,
			message: '',
			mangeStageAddDialog: false,
			stageColorLists: [
				'primary',
				'orange',
				'green',
				'purple',
				'red',
				'gary',
			],
			addStage: {
				name: '',
				valid: true,
				dragging: false,
				steps: [
					{
						name: '',
						color: '',
					},
				]
			},
			editStage: {
				name: '',
				valid: true,
				dragging: false,
				steps: [],
			},
			stageList: [
				{
					processName: 'Sales Process',
					steps: [
						{
							name: 'Lead In',
							color: 'primary',
						},
						{
							name: 'Contact Made',
							color: 'orange',
						},
						{
							name: 'Needs Defined',
							color: 'green',
						},
						{
							name: 'Proposal Made',
							color: 'purple',
						},
						{
							name: 'NegoTiations Started',
							color: 'gary',
						},
					],
				}
			],
			mangeStageEditDialog: false,
			notEmailSetting: true,
			connectEmailAccountDialog: false,
			connectEmail: {
				emailAddress: '',
			},
			connectEmailAccountSettingDialog: false,
			emailSharing: 0,
			emailLink: 0,
			syncEmailWith: 0,
			syncStartFrom: 0,
			syncReceivedFrom: 0,
			searchTemplate: '',
			manageAddTemplateDialog: false,
			manageEditTemplateDialog: false,
			mangeTemplateHeaders: [
				{  text: 'Template Name', value: 'templateName', align: 'center' },
				{  text: 'Create Time', value: 'createTime', align: 'center' },
				{  text: 'Last Modify Time', value: 'lastModifyTime', align: 'center' },
				{  text: 'Active', value: 'active', align: 'center', width: 120 },
			],
			mangeTemplateData: [
				{
					templateName: 'template 1',
					createTime: '2021/10/20',
					lastModifyTime: '2021/10/20',
					templateContent: 'Hi Everyone.',
				}
			],
			addTemplate: {
				valid: true,
				templateName: '',
				templateContent: '',
				templateContentIndex: '',
			},
			editTemplateIndex: '',
			editTemplate: {
				valid: true,
				templateName: '',
				templateContent: '',
				templateContentIndex: '',
			},
			addEmailTemplateTabs:'',
			editEmailTemplateTabs:'',
		}
	},
	mounted() {
		this.mangeUserShowData = _.filter(this.mangeUserDesserts, { 'active': true });
	},
	methods: {
		onResize: function () {
			if (window.innerWidth < 992) {
				this.isdesktop = false;
			}
		},
		onMall: function (mail) {
			return 'mailto:'+mail;
		},
		changeActive(val) {
			if (val) {
				this.mangeUserShowData = _.filter(this.mangeUserDesserts, { 'active': true });
			} else {
				this.mangeUserShowData = _.filter(this.mangeUserDesserts, { 'active': false });
			}
		},
		// Message Dialog
		onDelete () {
			this.showMessageDialog('您確定要刪除嗎？');
		},
		showMessageDialog(message) {
			this.messageDialog = true;
			this.message = message;
		},
		onEmitMessageDialog(val) {
			this.messageDialog = false;
			if (val) { this.showSussessDialog(); }
		},
		showAddUserDialog() {
			this.mangeUserAddDialog = true;
		},
		onUserAdd() {
			this.mangeUserAddDialog = false;
		},
		showEditUserDialog(data) {
			this.mangeUserEditDialog = true;
			this.editUser.firstName = data.firstName;
			this.editUser.lastName = data.lastName;
			this.editUser.mail = data.mail;
		},
		onUserEdit() {
			this.mangeUserEditDialog = false;
		},
		showAddCustomField() {
			this.customFieldAddDialog = true;
		},
		onCustomFieldAdd() {
			this.customFieldAddDialog = false;
		},
		showAddStageDialog() {
			this.mangeStageAddDialog = true;
		},
		onStageAdd() {
			this.mangeStageAddDialog = false;
		},
		showEditStageDialog(data) {
			this.editStage.name = data.processName;
			this.editStage.steps = data.steps;
			this.mangeStageEditDialog = true;
		},
		onStageEdit() {
			this.mangeStageEditDialog = false;
		},
		showAddEmail() {
			this.connectEmailAccountDialog = true;
		},
		onEmailAccountAdd() {
			this.connectEmailAccountDialog = false;
			this.notEmailSetting = false;
			this.connectEmailAccountSettingDialog = true;
		},
		onEmailSync() {
			this.connectEmailAccountSettingDialog = false;
		},
		stopSyncing() {
			this.showMessageDialog('Are you sure stop syncing?');
		},
		showAddTemplateDialog() {
			this.manageAddTemplateDialog = true;
		},
		onEmailTemplateAdd() {
			this.manageAddTemplateDialog = false;
		},
		showEditTemplateDialog(data, dataIndex){
			this.manageEditTemplateDialog = true;
			this.editTemplateIndex = dataIndex;
			this.editTemplate = {
				templateName: data.templateName,
				templateContent: data.templateContent,
			};
		},
		onEmailTemplateEdit(data) {
			this.mangeTemplateData[this.editTemplateIndex].templateName = data.templateName;
			this.mangeTemplateData[this.editTemplateIndex].templateContent = data.templateContent;
			this.manageEditTemplateDialog = false;
		},
		addStageInput() {
			if (this.addStage.steps.length < 11) {
				this.addStage.steps.push({ name: '', color: '' });
			} else {
				this.addStage.addInputDisable = true;
			}
		},
		checkMove: function(e) {
			window.console.log("Future index: " + e.draggedContext.futureIndex);
		},
		addEmailTemplateFields(val) {
			const content = this.addTemplate.templateContent.replace(/<[^>]+>/g,"");
			const startString = content.slice(0, this.addTemplate.templateContentIndex);
			const endString = content.slice(this.addTemplate.templateContentIndex);
			const insertString = ` {{${val}}}`;
			this.addTemplate.templateContent = startString + insertString + endString;
		},
		onEditorBlur(quill) {
			console.log("editor blur!", quill);
		},

		onEditorFocus(quill) {
			console.log("editor focus!", quill);
		},
		onSelectionChange(range) {
			this.addTemplate.templateContentIndex = range.index;
		},
	},
}
</script>
<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
</style>