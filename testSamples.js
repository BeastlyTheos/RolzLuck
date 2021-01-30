//1, plaintext
const sample1= `
<div class="chline txtmsg   ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhg8vkr" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" style="opacity:0.5" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfredh</span>:
			<span style="">
				u
			</span>
		</div>
	</div>
`

//2, rolls comment, natural 1
const sample2 = `
<div class="chline dicemsg   ctx_ ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhgawq6" aria-label="dice roll" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfredh</span>
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
`

//3, plaintext, looks like a dice code
const sample3 = `
<div class="chline txtmsg   ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhgi753" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" style="opacity:0.5" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfredh</span>:
			
			<span style="">
				first #d30 # hello
			</span>
		</div>
	</div>                
`

//4, rolls comment
const sample4 = `
<div class="chline dicemsg   ctx_ ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhgizi8" aria-label="dice roll" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfredh</span>
			<span class="gray">rolls
			
				<a onclick="loadLinkCli($(event.target), false, '#');">d48 </a> = 
			
			</span>
			<span class="">
				<span class="result2">34</span>
			</span>
			<span class="comment">#final</span>
		</div>
	</div>
`

//5, plaintext with inline rolls
const sample5 = `
<div class="chline txtmsg   ctx_">
	<div class="line-icon">
		<a href="/info?jjl36b1b8r:kkhgou3p" target="_blank" data-title="">
			<img src="/img/d6-32px.png" width="16" style="opacity:0.5" align="absmiddle">
			</a>
		</div>
		<div class="line-content">
			<!---->
			<span class="username" style="">_Alfredh</span>:
			
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
`

//6, server message
const sample6 = `
<div class="chline  privatesrvmsg ctx_">
		<div class="line-icon">?</div>
		<div class="line-content">Welcome, _Alfredh! Lines starting with a / (slash) are chat commands. Lines starting with a # (hash) or a - (minus) will be interpreted as dice codes. Anything else is text. For more details, refer to the help screen on the right.
 You are in "unnamed_room".</div>
	</div>
`

module.exports.rolls = [sample2, sample4, sample5]
module.exports.nonRolls = [sample1, sample3, sample6]
