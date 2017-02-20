var SaaS = { };

SaaS.Component = new Class (
{
	Implements: Events,

	initialize : function (config)
	{
		this.id = config ? config.id : undefined;

		this.initComponent (config);

		SaaS.ComponentMgr.register (this);
	},

	getId : function ()
	{
		if (!this.id)
		{
			this.id = "component-" + (++SaaS.Component.AUTO_ID);
		}

		return this.id;
	},

	initComponent : function (config)
	{
	}
});

SaaS.Component.AUTO_ID = 1000;

SaaS.ComponentMgr =
{
	idToComponent : new Hash (),

	getComponents : function ()
	{
		return SaaS.ComponentMgr.idToComponent;
	},

	register : function (idOrComponent, component)
	{
		if (component)
		{
			SaaS.ComponentMgr.idToComponent.set (idOrComponent, component);
		}
		else
		{
			SaaS.ComponentMgr.idToComponent.set (idOrComponent.getId (), idOrComponent);
		}
	},

	unregister : function (id)
	{
		SaaS.ComponentMgr.idToComponent.erase (id);
	},

	get : function (id)
	{
		return SaaS.ComponentMgr.idToComponent.get (id);
	}
};

SaaS.getCmp = function (id)
{
	return SaaS.ComponentMgr.get(id);
};