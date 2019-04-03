$(document).ready(function() {
	$('#username').keyup(function(event) {
		/* Act on the event */
		
		let name=event.target.value;

		$.ajax({
			url: 'https://api.github.com/users/'+name,
			data: {client_id:'27015a0cc3422ef20c15',client_secret:'4686da0407358248d4be549ff769e7ca8b144fbd'
			}

})
		.done(function(user) { 
			
			function verify(v)
		{
			if(v)
				return v;
			else
				return user.login;
		}

		$.ajax({
			url: 'https://api.github.com/users/'+name+'/repos',
			data: {client_id:'27015a0cc3422ef20c15',client_secret:'4686da0407358248d4be549ff769e7ca8b144fbd'}
		})
		.done(function(repos) {
			
                  
                  $.each(repos,function(index,repo) {
                  	console.log(repo.name);

                  	$('#rep').append(`

                  	<div class="well">

                        <div class="row">
                        <div class="col-sm-6">
                       <b> ${repo.name}</b> : ${repo.description}
                        </div>
                        <div class="col-sm-4">
                         <span class="label label-primary"><b>Forks:</b>${repo.forks_count}</span>
             <span class="label label-success"><b>Watchers:</b>${repo.watchers_count}</span>
             <span class="label label-info"><b>Stargrazers:</b>${repo.stargazers_count}</span>
              <span class="label label-danger"><b>Default Branch:</b>${repo.default_branch}</span>
             <span class="label label-warning"><b>Open Issues:</b>${repo.open_issues}</span>
             <span class="label label-info"><b>Language(program):</b>${repo.language}</span>

                        </div>

                        <div class="col-sm-2">
                           <a href=${repo.html_url} target="_blank" class="btn btn-primary">View Repo</a>
                        </div>

                        </div>
                      

                  	</div>
                  	
                  

				`);
		});
		});
	

			$('.profile').html(`
				<div class="container-fluid">
  <div class="panel panel-default">
    <div class="panel-heading">${verify(user.name)}</div>
    <div class="panel-body">
        <div class="row" >
             <div class="col-md-3">
             <img style="width:100%;" src="${user.avatar_url}" alt="profile img loading..." class="thumbnail">
             <a href="${user.html_url}" type="button" target="_blank" class="btn btn-default btn-block">View profile</a>
             </div>
             <div class="col-md-7">
             <span class="label label-default"><b>Public Repos:</b>${user.public_repos}</span>
             <span class="label label-primary"><b>Public Gists:</b>${user.public_gists}</span>
             <span class="label label-success"><b>Followers:</b>${user.followers}</span>
             <span class="label label-info"><b>Following:</b>${user.following}</span><br><br><br>
             <ul class="list-group">
             <li class="list-group-item"><b>Company name:</b>${user.company}</li>
             <li class="list-group-item"><b>Website/blog:</b>${user.blog}</li>
             <li class="list-group-item"><b>Location:</b>${user.location}</li>
             <li class="list-group-item"><b>Member Since:</b>${user.created_at}</li>
             <li class="list-group-item"><b>Email:</b>${user.email}</li>
             <li class="list-group-item"><b>Bio:</b>${user.bio}</li>
             </ul>
             </div>
        </div>

    </div>
  </div>

 
</div>

 <div id="rep" > </div>
				`);
		})
		.fail(function (jqXHR, exception) {
        // Our error logic here
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Profile not found,it may not exist';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        $('.profile').html("<div class='well'>"+msg+"</div>");
    })
		.always(function() {
			console.log("complete");
		});




	});	
});
