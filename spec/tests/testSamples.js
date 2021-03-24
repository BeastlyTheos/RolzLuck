/* globals module */
class RollStub {
	constructor(name, diceCodes, results) {
		this.name = name
		this.diceCodes = diceCodes
		this.results = results
	}
}

class MockMutation {
	constructor(type, addedNodes) {
		this.type = type
		this.addedNodes = []
		for (const addedNode of addedNodes) {
			var node = document.createElement("div")
			node.innerHTML = addedNode
			this.addedNodes[this.addedNodes.length] = node
		}
	}
}

class SampleData {
	constructor(mutation, roll) {
		this.mutation = mutation
		this.roll = roll
	}
}

//1, plaintext
const sampleData1 = new SampleData(
	new MockMutation("childList", [
		`
<div class="chline txtmsg   ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhg8vkr" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" style="opacity:0.5" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfred</span>:
			<span style="">
				u
			</span>
		</div>
	</div>
`,
	]),
	null
)

//2, rolls comment, natural 1
const sampleData2 = new SampleData(
	new MockMutation("childList", [
		`
<div class="chline dicemsg   ctx_ ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhgawq6" aria-label="dice roll" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfred</span>
			<span class="gray">rolls
    			
				<a onclick="loadLinkCli($(event.target), false, '#');">d20 </a> = 
			</span>
			<span class="">
				<span class="result2">1</span>
			</span>
			<span class="tags">
				<i class="fa fa-lightbulb-o"></i> natural one:1 
			</span>
			<span class="comment">#testing</span>
		</div>
	</div>
`,
	]),
	new RollStub("_Alfred", ["d20 "], [1])
)

//3, plaintext, looks like a dice code
const sampleData3 = new SampleData(
	new MockMutation("childList", [
		`
<div class="chline txtmsg   ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhgi753" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" style="opacity:0.5" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfred</span>:
			
			<span style="">
				first #d30 # hello
			</span>
		</div>
	</div>                
`,
	]),
	null
)

//4, rolls comment
const sampleData4 = new SampleData(
	new MockMutation("childList", [
		`
<div class="chline dicemsg   ctx_ ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhgizi8" aria-label="dice roll" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfred</span>
			<span class="gray">rolls
			
				<a onclick="loadLinkCli($(event.target), false, '#');">d48 </a> = 
			
			</span>
			<span class="">
				<span class="result2">34</span>
			</span>
			<span class="comment">#final</span>
		</div>
	</div>
`,
	]),
	new RollStub("_Alfred", ["d48 "], [34])
)

//5, plaintext with inline rolls
const sampleData5 = new SampleData(
	new MockMutation("childList", [
		`
<div class="chline txtmsg   ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhgou3p" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" style="opacity:0.5" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfred</span>:
			
			<span style="">
				hello 
				[ 
				<a onclick="loadLinkCli($(event.target), false, '#');">d8</a> =
				( (5) )
				
				<span class="">
					<span class="result2">5</span>
				</span>
				<span class="comment"></span> ]
				 world
			
			</span>
		</div>
`,
	]),
	new RollStub("_Alfred", ["d8"], [5])
)

//6, server message
const sampleData6 = new SampleData(
	new MockMutation("childList", [
		`
<div class="chline  privatesrvmsg ctx_">
		<div class="line-icon">?</div>
		<div class="line-content">Welcome, _Alfred! Lines starting with a / (slash) are chat commands. Lines starting with a # (hash) or a - (minus) will be interpreted as dice codes. Anything else is text. For more details, refer to the help screen on the right.
 You are in "unnamed_room".</div>
	</div>
`,
	]),
	null
)

//7, two embedded rolls
const sampleData7 = new SampleData(
	new MockMutation("childList", [
		`
<div class="chline txtmsg   ctx_">
		<div class="line-icon">
			<a href="/info?jjl36b1b8r:kkkuvhxp" target="_blank" data-title="">
				<img src="/img/d6-32px.png" width="16" style="opacity:0.5" align="absmiddle"></a>
		</div>
		<div class="line-content">
		<!---->
			<span class="username" style="">_Alfredh</span>:
			<span style="">
			before 
				[ <a onclick="loadLinkCli($(event.target), false, '#');">d20</a> =
				( (6) )
				<span class="">
					<span class="result2">6</span>
			</span>
			<span class="comment"></span> ]
			 middle 
				[ <a onclick="loadLinkCli($(event.target), false, '#');">d12</a> =
				( (11) )
				<span class="">
					<span class="result2">11</span>
			</span>
			<span class="comment"></span> ]
				 after
		</span>
		</div>
	</div>
`,
	]),
	new RollStub("_Alfredh", ["d20", "d12"], [6, 11])
)

module.exports.rollMutations = [
	sampleData2,
	sampleData4,
	sampleData5,
	sampleData7,
]
module.exports.nonRollMutations = [sampleData1, sampleData3, sampleData6]
