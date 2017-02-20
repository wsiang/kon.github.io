(function($){
SaaS.PagingNavigator = new Class (
{
	Extends : SaaS.Component,

	initComponent : function (config)
	{
		Object.append(this, Object.append ({ maxDisplayPageNumber : 10, pageSizeList : [1, 5, 10, 20, 50, 100, 200], align : "right" }, config)); 
		
		this.firstPageText = "|<";
		this.prevPageText = "<";
		this.nextPageText = ">";
		this.lastPageText = ">|";
		
		this.rendered = false;
		
		this.setPagingState ({ recordCount : config.recordCount, pageSize : config.pageSize, pageIndex : config.pageIndex });
		
		this.addEvent ("change", this.onChange.bind (this));
	},

	getEl : function ()
	{
		return $(this.renderTo);
	},
	
	getRecordCount : function ()
	{
		return this.getPagingState ().recordCount;
	},
	
	getPageSize : function ()
	{
		return this.getPagingState ().pageSize;
	},
	
	getPageIndex : function ()
	{
		return this.getPagingState ().pageIndex;
	},
	
	getPagingState : function ()
	{
		return { recordCount : this.recordCount, pageSize : this.pageSize, pageIndex : this.pageIndex };
	},
	
	setPagingState : function (pagingState)
	{
		var oldRecordCount = this.getRecordCount ();
		var oldPageSize = this.getPageSize ();
		var oldPageIndex = this.getPageIndex ();
		
		var recordCount = pagingState.recordCount;
		var pageSize = pagingState.pageSize;
		var pageIndex = pagingState.pageIndex;
		
		if (recordCount && isNaN(recordCount)) return;
		if (pageSize && isNaN(pageSize)) return;
		if (pageIndex && isNaN(pageIndex)) return;
		
		if (recordCount)
		{
			this.recordCount = recordCount;
		}
		
		if (pageSize)
		{
			if (pageSize < 1) { pageSize = 1 }
			
			this.pageSize = pageSize;
		}
		
		if ((recordCount || pageSize) && !pageIndex)
		{
			if (this.pageIndex < 1) { pageIndex = 1; }
			
			if (this.pageIndex > this.getPageCount ()) { pageIndex = this.getPageCount(); }
		}
		
		if (pageIndex)
		{
			if (pageIndex < 1) { pageIndex = 1; }
			
			if (pageIndex > this.getPageCount ()) { pageIndex = this.getPageCount(); }
			
			this.pageIndex = pageIndex;
		}
		
		if ((recordCount && recordCount != oldRecordCount) || 
			(pageSize && pageSize != oldPageSize) || 
			(pageIndex && pageIndex != oldPageIndex))
		{
			this.fireEvent ("change", [
			                           { recordCount : recordCount, pageSize : pageSize, pageIndex : pageIndex },
			                           { recordCount : oldRecordCount, pageSize : oldPageSize, pageIndex : oldPageIndex }
			                           ]);
		}
	},

	getPageCount : function ()
	{
		var pageCount = 0;

		if (this.getRecordCount () > 0)
		{
			if (this.getPageSize () >= this.getRecordCount ())
			{
				pageCount = 1;
			}
			else
			{
				if ((this.getRecordCount () % this.getPageSize ()) > 0)
				{
					pageCount = (this.getRecordCount () / this.getPageSize ()) + 1;
				}
				else
				{
					pageCount = this.getRecordCount () / this.getPageSize ();
				}
			}
		}

		return pageCount.toInt ();
	},

	getMaxDisplayPageNumber : function ()
	{
		return this.maxDisplayPageNumber;
	},

	getFirstDisplayPageNumber : function ()
	{
		var first = this.getMaxDisplayPageNumber () % 2 > 0 ? this.getMaxDisplayPageNumber () / 2 : (this.getMaxDisplayPageNumber () / 2) - 1;
		if (this.getPageIndex () + first > this.getPageCount())
		{
			first = (this.getPageIndex () - ((this.getPageIndex () + first) - this.getPageCount())) - first;
			if ((this.getMaxDisplayPageNumber() % 2) == 0)
			{
				first--;
			}
		}
		else
		{
			first = this.getPageIndex () - first;
		}

		first = first > 1 ? first : 1;

		return first;
	},

	getLastDisplayPageNumber : function ()
	{
		var last = (this.getFirstDisplayPageNumber() - 1) + this.getMaxDisplayPageNumber ();

		if (last > this.getPageCount())
		{
			last = this.getPageCount();
		}

		return last;
	},
	
	onChange : function (newState, oldState)
	{
		if (!this.rendered) return;
		
		if (this.getPageCount <= 0)
		{
			this.getEl ().hide ();
		}
		else
		{
			var tr = this.getEl ().getElement ("table").getElement ("tbody").getElement ("tr");
			tr.getElements ("td").filter (".recordCount").pick ().set ("text", this.getRecordCount ());
			tr.getElements ("td").filter (".pageCount").pick ().set ("text", this.getPageIndex () + "/" + this.getPageCount());
			
			if (this.getPageIndex () <= 1)
			{
				tr.getElements ("td").filter (".firstPage,.prevPage").each (function (td) { td.hide () });
			}
			else
			{
				tr.getElements ("td").filter (".firstPage,.prevPage").each (function (td) { td.show () });
			}
			
			for (var flag = 0; flag < this.getMaxDisplayPageNumber (); flag++)
			{
				var td = tr.getElements ("td").filter (".page" + flag).pick ();
				
				if (flag >= this.getLastDisplayPageNumber ())
				{
					td.hide ();
				}
				else
				{
					td.show ();
					td.getElement ("a").set ("text", this.getFirstDisplayPageNumber () + flag);
				}
				
				if ((flag + this.getFirstDisplayPageNumber()) == this.getPageIndex ())
				{
					td.removeClass ("page");
					td.addClass ("selectedPage");
				}
				else
				{
					td.addClass ("page");
					td.removeClass ("selectedPage");
				}
			}
			
			if (this.getPageIndex () >= this.getPageCount ())
			{
				tr.getElements ("td").filter (".nextPage,.lastPage").each (function (td) { td.hide () });
			}
			else
			{
				tr.getElements ("td").filter (".nextPage,.lastPage").each (function (td) { td.show () });
			}
		}
	},

	render : function ()
	{
		if (this.rendered) return;
		
		var newPageIndexInput = function ()
		{
			var inputEl = new Element ("input", { "type" : "text", "style" : "width:30px;height:100%" });
			inputEl.addEvent ("change", function ()
			{
				this.setPagingState ({ pageIndex : inputEl.value.toInt () });
			}.bind (this));
			
			return inputEl;
		}.bind (this);
		
		var newPageSizeInput = function ()
		{
			var select = new Element ("select");
			this.pageSizeList.each (function (pageSize)
			{
				select.grab (new Element ("option", { "text" : pageSize, "value" : pageSize }));
			});

			return select;
		}.bind (this);

		var newPageLink = function (flag, text)
		{
			var click;
			switch (flag)
			{
				case SaaS.PagingNavigator.FIRST_PAGE_FLAG:
					click = function () { this.setPagingState ({ pageIndex : 1 }) }.bind (this);
					break;
				case SaaS.PagingNavigator.PREV_PAGE_FLAG:
					click = function () { this.setPagingState ({ pageIndex : this.getPageIndex () - 1 }) }.bind (this);
					break;
				case SaaS.PagingNavigator.NEXT_PAGE_FLAG:
					click = function () { this.setPagingState ({ pageIndex : this.getPageIndex () + 1 }) }.bind (this);
					break;
				case SaaS.PagingNavigator.LAST_PAGE_FLAG:
					click = function () { this.setPagingState ({ pageIndex : this.getPageCount () }) }.bind (this);
					break;
				default:
					click = function () { this.setPagingState ({ pageIndex : this.getFirstDisplayPageNumber () + flag }) }.bind (this);
					break;
			}
			
			return new Element ("a", { "href" : "javascript:", "text" : text, events : { click : click } });
		}.bind (this);
		
		var table = new Element ("table", { "id" : this.getId (), "cellspacing" : "1", "class" : "pagingNavigator", "align" : this.align, "style" : "padding-right:40px" });
		var tbody = new Element ("tbody");
		var tr = new Element ("tr");
		var td;
		tr.grab (new Element ("td", { "class" : "info recordCount", "text" : this.getRecordCount () }));
		tr.grab (new Element ("td", { "class" : "info pageCount", "text" : this.getPageIndex () + "/" + this.getPageCount() }));
		
		var firstPageTd = new Element ("td", { "class" : "page firstPage" });
		firstPageTd.grab (newPageLink (SaaS.PagingNavigator.FIRST_PAGE_FLAG, this.firstPageText));
		tr.grab (firstPageTd);
		
		var prevPageTd = new Element ("td", { "class" : "page prevPage" });
		prevPageTd.grab (newPageLink(SaaS.PagingNavigator.PREV_PAGE_FLAG, this.prevPageText));
		tr.grab (prevPageTd);
		
		if (this.getPageIndex () <= 1)
		{
			firstPageTd.hide ();
			prevPageTd.hide ();
		}
		
		for (var flag = 0; flag < this.getMaxDisplayPageNumber (); flag++)
		{
			var link = newPageLink (flag);
			
			if ((flag + this.getFirstDisplayPageNumber()) == this.getPageIndex ())
			{
				td = new Element ("td", { "class" : "selectedPage page" + flag });
			}
			else
			{
				td = new Element ("td", { "class" : "page" + flag });
			}
			
			td.grab (link);
			tr.grab (td);
			
			if (flag > (this.getLastDisplayPageNumber () - 1))
			{
				td.hide ();
			}
			else
			{
				link.set ("text", this.getFirstDisplayPageNumber () + flag);
			}
		}
		
		var nextPageTd = new Element ("td", { "class" : "page nextPage" });
		nextPageTd.grab (newPageLink (SaaS.PagingNavigator.NEXT_PAGE_FLAG, this.nextPageText));
		tr.grab (nextPageTd);

		var lastPageTd = new Element ("td", { "class" : "page lastPage" });
		lastPageTd.grab (newPageLink (SaaS.PagingNavigator.LAST_PAGE_FLAG, this.lastPageText));
		tr.grab (lastPageTd);
		
		if (this.getPageIndex () >= this.getPageCount ())
		{
			nextPageTd.hide ();
			lastPageTd.hide ();
		}

		//td = new Element ("td", { "class" : "input" });
		//td.grab (newPageIndexInput ());
		//tr.grab (td);

		/*if (this.pageSizeSetter == undefined || this.pageSizeSetter == true)
		{
			td = new Element ("td", { "class" : "input" });
			td.grab (newPageSizeInput ());
			tr.grab (td);
		}*/

		tbody.grab (tr);

		table.grab (tbody);

		if (this.pageSizeSetter == undefined || this.pageSizeSetter == true)
		{
			/*var comboBox = new Ext.form.ComboBox ({ transform : td.getElement ("select"), typeAhead: true, triggerAction : "all", width : 50, listWidth : 50 });
			comboBox.setRawValue (this.getPageSize());

			comboBox.on ("select", function ()
			{
				this.setPagingState({ pageSize : comboBox.getRawValue () });
			}.bind (this));*/
		}
		
		this.getEl ().grab (table);
		
		if (this.getPageCount <= 0)
		{
			this.getEl ().hide ();
		}
		
		this.rendered = true;
	}
});
			
SaaS.PagingNavigator.FIRST_PAGE_FLAG = -4;
SaaS.PagingNavigator.PREV_PAGE_FLAG = -3;
SaaS.PagingNavigator.NEXT_PAGE_FLAG = -2;
SaaS.PagingNavigator.LAST_PAGE_FLAG = -1;

}) (document.id);