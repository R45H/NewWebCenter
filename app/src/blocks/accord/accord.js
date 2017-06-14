/* Аккордеон */
var
	$accordHead = $('.accord__head'), // Шапки панелей
	accordOpened = 'accord__panel_opened', // Класс открытой панели
	accordRadio = 'accord__radio', // Класс чекбокса
	accordRadioChecked = 'accord__radio_checked', // Класс активного чекбокса
	$accordRadio = $('.' + accordRadio), // Чекбоксы
	$mainCostWrap = $('.price__cost'), // Фиксированный блок стоимости
	$bottomCostWrap= $('.main__total-cost'); // Блок стоимости снизу

// Работа аккордеона
$accordHead.on('click', function() {
	var
		$this = $(this),
		$parent = $this.parent(), // Контейнер текущей шапки
		$next = $this.next(); // Тело панели

	if ($parent.hasClass(accordOpened)) {
		$parent.removeClass(accordOpened);
		$next.slideUp(300);
	} else {
		$parent.addClass(accordOpened);
		$next.slideDown(300);
	}
});
// ==========

// Работа чекбоксов
$accordRadio.on('click', function() {
	var
		$this = $(this),
		cost = +$mainCostWrap.text(); // Стоимость

	if ($this.hasClass(accordRadioChecked)) {
		$this
			.removeClass(accordRadioChecked)
			.prop('checked', false);

		cost -= +$this.val();
	} else {
		var $prev = $this.parent().parent().find('.' + accordRadioChecked); // Чекбокс, уже выбранный на момент клика

		if ($prev.length) {
			$prev
				.removeClass(accordRadioChecked)
				.prop('checked', false);

			cost -= +$prev.val();
		}

		$this
			.addClass(accordRadioChecked)
			.prop('checked', true);

		cost += +$this.val();
	}

	$mainCostWrap.text(cost);
	$bottomCostWrap.text(cost);
});
// ==========

// Появление и скрытие фиксированного блока стоимости
toggleMobilePrice();

$(window).on('scroll resize', function() {
	toggleMobilePrice();
});
// ==========

function toggleMobilePrice() {
	var
		$mainCostOuter = $mainCostWrap.parent().parent(), // Внешний контейнер главной стоимости
		$bottomCostOuter = $bottomCostWrap.parent().parent(), // Внешний контейнер нижней стоимости
		mainCostPos = $mainCostOuter.offset().top, // Верхняя позиция главной стоимости
		bottomCostPos = $bottomCostOuter.offset().top, // Верхняя позиция нижней стоимости
		mainCostHidden = 'price_hidden'; // Класс, скрывающий блок стоимости

	if (window.innerWidth > 991) {
		$mainCostOuter.removeClass(mainCostHidden);
		return;
	}

	//TODO Допилить плавное появление блока стоимости
	if (mainCostPos > bottomCostPos) {
		$mainCostOuter.addClass(mainCostHidden);
	} else {
		$mainCostOuter.removeClass(mainCostHidden);
	}
}
/* ========== */
