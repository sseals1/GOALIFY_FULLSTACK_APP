//using System;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using OpenAI.GPT3.Interfaces;
//using OpenAI.GPT3.ObjectModels.RequestModels;
//using Goalify.Models;

//namespace Goalify.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class OpenAIController : ControllerBase
//    {
//        private readonly IOpenAIService _openAiService;

//        public OpenAIController(IOpenAIService openAiService)
//        {
//            _openAiService = openAiService;
//        }

//        [HttpGet]
//        public async Task<ActionResult<string>> Get()
//        {
//            var completionResult = await _openAiService.Completions.CreateCompletion(new CompletionCreateRequest()
//            {
//                Prompt = "What is the meaning of life?",
//                Model = Models.TextDavinciV2,
//                Temperature = 0.5F,
//                MaxTokens = 100,
//                N = 3
//            });

//            if (completionResult.Successful)
//            {
//                return Ok(completionResult.Choices[0].Text);
//            }
//            else
//            {
//                if (completionResult.Error == null)
//                {
//                    throw new Exception("Unknown Error");
//                }
//                return StatusCode((int)completionResult.Error.Code, completionResult.Error.Message);
//            }
//        }
//    }
//}

