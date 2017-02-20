
	function scroll()
	{
		var _doc = document,
			_box = _doc.getElementById("textScroll"),
			_con = _doc.getElementById("textScroll_item_con"),
			_w = _con.scrollWidth,
			_delay = 50,
			_time_id = null;
			
		_con.innerHTML += _con.innerHTML;
		function _go()
		{
			if(_box.scrollLeft<_w)
			{
				_box.scrollLeft += 1;
			}
			else
			{
				_box.scrollLeft = 0;
			}
			_time_id = setTimeout(_go,_delay);
		};
		
		_time_id = setTimeout(_go,_delay);
		
		$("#textScroll_item").live("mouseenter",function()
		{
			clearTimeout(_time_id);
		});
		$("#textScroll_item").live("mouseleave",function()
		{
			_time_id = setTimeout(_go,_delay);
		});
	};
