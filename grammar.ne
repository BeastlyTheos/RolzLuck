expr -> c
c -> [dD] int {%
	 function(data) {
		return data[1]
	}
%}
int -> [0-9]:+ {% (data) => { return parseInt(data[0].join("")) } %}
