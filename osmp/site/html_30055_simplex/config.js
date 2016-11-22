APP_CONFIG = {
	"options": {
		"version": "������ ���/Simplex v1.0.47",
		"shortVersion": "v1.0.47",
		"timeout_page": "stat",
		"log": "true",
		"single_page_app": "true",
		"start_page": "1"
	},
	"session": {
		"PrvName": "���� ���� (���)",
		"fiscal_receipt": "true"
	},
	"pages": {
		"1": {
			"class": "CheckStatusView",
			"preloader_text": "��������<br/>������",
			"prv_id": "441",
			"min_show_time": "5",
			"need_printer": "false",
			"nav_events": {
				"success": "2",
				"fail": "stat"
			},
			"provider-popup": {
				"title": "��������� ��������",
				"message": "���������� ��������� ������ �� ���� ���������",
				"closeButtonText": "OK"
			},
			"connection-popup": {
				"title": "����������� ������",
				"message": "���������� ��������� ������ �� ���� ���������",
				"closeButtonText": "OK"
			},
			"printer-popup": {
				"title": "������ ��������",
				"message": "���������� ��������� ������ �� ���� ���������",
				"closeButtonText": "OK"
			}
		},
		"2": {
			"class": "ComboView",
			"preloader_text": "��������<br/>������",
			"nav_events": {
				"submitted": "3",
				"offertus": "9",
				"fail": "stat"
			}
		},
		"3": {
			"class": "ConfirmationView",
			"header": "��������� ������������ ������",
			"comment": " ",
			"prev_page": "2",
			"nav_events": {
				"counters": "4",
				"no_counters": "5"
			}
		},
		"4": {
			"class": "SelectView",
			"header": " ",
			"comment": " ",
			"prev_page": "3",
			"nav_events": {
				"submitted": "5"
			}
		},
		"5": {
			"class": "ChangeOptionsView",
			"header": "�������� ������� ���������� �����",
			"comment": " ",
			"nav_events": {
				"mobile": "6",
				"wallet": "6",
				"counters": "4",
				"no_counters": "3"
			}
		},
		"6": {
			"class": "PhoneEnterView",
			"header": "������� ��� ����� ��������",
			"comment": "��� (8) � ������� (���) ���-��-��",
			"maxChars": "10",
			"prev_page": "5",
			"nav_events": {
				"submitted": "10"
			},
			"wrong_number_popup": {
				"title": "�������� �����",
				"message": "����� <%=phone%> �� ������"
			}
		},
		"7": {
			"class": "CashPaymentView",
			"preloader_text": "���������� ������<br/>��������� ����",
			"exit_page": "none",
			"prev_page": "none",
			"header": "������� ������",
			"comment": " ",
			"payment_options": {
				"PrvId": {
					"key": "PrvId"
				},
				"AccNum": {
					"key": "fields_account"
				},
				"PrvName": {
					"key": "PrvName"
				},
				"PrvId2": {
					"key": "PrvId2"
				},
				"AccNum2": {
					"key": "AccNum2"
				},
				"_extra_fixed_int_summ": {
					"key": "_extra_fixed_int_summ"
				}
			},
			"nav_events": {
				"success": "8",
				"fail": "8",
				"zero_cash": "stat",
				"validator_error": "stat",
				"validator_timeout": "stat"
			}
		},
		"8": {
			"class": "FinalView",
			"header": "������ ������"
		},
		"9": {
			"class": "OffertusView",
			"url": "data/offertus.html",
			"exit_page": "none",
			"comment": " ",
			"prev_page": "2",
			"load_error_popup": {
				"title": "������",
				"message": "���������� ��������� ��������� ������"
			}
		},
		"10": {
			"class": "ShadowView",
			"nav_events": {
				"submitted": "7",
				"failure": "6"
			},
			"load_error_popup": {
				"title": "������",
				"message": "���������� ����������� ����� �� ��������� �����. �������� ������ ������ ������."
			}
		},
		"stat": {
			"class": "StatisticsView"
		}

	}
};
