﻿using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Completions;
using System.IO;

namespace Goalify.Controllers
{
    public class OpenAIController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("getresult")]
        public IActionResult GetResult([FromBody]string prompt)
        {
            string apikey = "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";
            string answer = string.Empty;
            var openai = new OpenAIAPI(apikey);
            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = prompt;
            completion.Model = OpenAI_API.Models.Model.DavinciText;
            completion.MaxTokens = 100;
            completion.Temperature = 0.8;
            var result = openai.Completions.CreateCompletionsAsync(completion);
            if (result!=null)
            {
                foreach (var item in result.Result.Completions)
                {
                    answer = item.Text;
                }
                return Ok(answer);
            }
            else
            {
                return BadRequest("Not Found");
            }
        }

    }
}
